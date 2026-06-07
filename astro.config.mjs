// @ts-check

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const _require = createRequire(import.meta.url);

// css-tree uses createRequire(import.meta.url) to load patch.json, which breaks
// when bundled by Vite since import.meta.url becomes the bundle's path. This
// plugin inlines the JSON at build time so the relative require isn't needed.
function cssPatchJsonPlugin() {
  return {
    name: "inline-css-tree-patch-json",
    load(id) {
      if (id.includes("css-tree") && id.endsWith("data-patch.js")) {
        const patchPath = id.replace("data-patch.js", "../data/patch.json");
        const patch = JSON.parse(readFileSync(patchPath, "utf-8"));
        return `export default ${JSON.stringify(patch)};`;
      }
    },
  };
}

// Several node_modules (vite/dist/node/chunks/logger.js, etc.) use import.meta.url
// to compute paths relative to their own location. When Vite bundles these into the
// prerender container, import.meta.url becomes the bundle URL instead of the original
// file URL, breaking all relative path calculations. Rollup's resolveImportMeta hook
// lets us restore the original per-module file URL before bundling.
function preserveImportMetaUrlPlugin() {
  return {
    name: "preserve-import-meta-url",
    resolveImportMeta(property, { moduleId }) {
      if (property === "url" && moduleId && moduleId.includes("node_modules")) {
        const normalized = moduleId.replace(/\\/g, "/");
        return `new URL("file://${normalized}")`;
      }
    },
  };
}

// rollup/dist/native.js (CJS) uses __dirname which is undefined when bundled
// into Vite's ESM prerender output. The .node file is never co-located anyway —
// Rollup always falls through to @rollup/rollup-<platform>. This plugin
// replaces the file with a minimal ESM stub that skips the broken __dirname check.
function rollupNativePlugin() {
  const ROLLUP_NATIVE_ID = /rollup[/\\]dist[/\\]native\.js$/;
  return {
    name: "rollup-native-esm-stub",
    load(id) {
      if (ROLLUP_NATIVE_ID.test(id)) {
        return `
import { createRequire } from 'node:module';
import { platform, arch, report } from 'node:process';
import { spawnSync } from 'node:child_process';
const _require = createRequire(import.meta.url);

let reportHeader;
const getReportHeader = () => {
  try {
    if (platform !== 'win32') {
      const prev = report.excludeNetwork;
      report.excludeNetwork = true;
      const header = report.getReport().header;
      report.excludeNetwork = prev;
      return header;
    }
    const script = "const r=require('node:process').report;r.excludeNetwork=true;console.log(JSON.stringify(r.getReport().header));";
    const child = spawnSync(process.execPath, ['-p', script], { encoding: 'utf8', timeout: 3000, windowsHide: true });
    if (child.status !== 0) return null;
    const stdout = child.stdout?.replace(/undefined\\r?\\n?$/, '').trim();
    return stdout ? JSON.parse(stdout) : null;
  } catch { return null; }
};
const isMusl = () => { reportHeader ??= getReportHeader(); return reportHeader ? !reportHeader.glibcVersionRuntime : false; };
const isMingw32 = () => { reportHeader ??= getReportHeader(); return reportHeader?.osName?.startsWith('MINGW32_NT') ?? false; };
const bindingsByPlatformAndArch = {
  android: { arm: { base: 'android-arm-eabi' }, arm64: { base: 'android-arm64' } },
  darwin: { arm64: { base: 'darwin-arm64' }, x64: { base: 'darwin-x64' } },
  freebsd: { arm64: { base: 'freebsd-arm64' }, x64: { base: 'freebsd-x64' } },
  linux: { arm: { base: 'linux-arm-gnueabihf', musl: 'linux-arm-musleabihf' }, arm64: { base: 'linux-arm64-gnu', musl: 'linux-arm64-musl' }, loong64: { base: 'linux-loong64-gnu', musl: 'linux-loong64-musl' }, ppc64: { base: 'linux-ppc64-gnu', musl: 'linux-ppc64-musl' }, riscv64: { base: 'linux-riscv64-gnu', musl: 'linux-riscv64-musl' }, s390x: { base: 'linux-s390x-gnu', musl: null }, x64: { base: 'linux-x64-gnu', musl: 'linux-x64-musl' } },
  openbsd: { x64: { base: 'openbsd-x64' } },
  openharmony: { arm64: { base: 'openharmony-arm64' } },
  win32: { arm64: { base: 'win32-arm64-msvc' }, ia32: { base: 'win32-ia32-msvc' }, x64: { base: isMingw32() ? 'win32-x64-gnu' : 'win32-x64-msvc' } },
};
function getPackageBase() {
  const imported = bindingsByPlatformAndArch[platform]?.[arch];
  if (!imported) throw new Error('Unsupported platform: ' + platform + ' ' + arch);
  if ('musl' in imported && isMusl()) return imported.musl || (() => { throw new Error('No musl build'); })();
  return imported.base;
}
const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = _require('@rollup/rollup-' + getPackageBase());
export { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 };
`;
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://kabirgoel.com",
  integrations: [sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      cssPatchJsonPlugin(),
      preserveImportMetaUrlPlugin(),
      rollupNativePlugin(),
    ],
    build: {
      rollupOptions: {
        external: ["fsevents"],
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "vitesse-light",
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Standard",
      cssVariable: "--font-standard",
      options: {
        variants: [
          {
            weight: "400",
            style: "normal",
            src: ["./src/assets/fonts/standard-book-webfont.woff2"],
          },
          {
            weight: "400",
            style: "italic",
            src: ["./src/assets/fonts/standard-book-italic-webfont.woff2"],
          },
          {
            weight: "700",
            style: "normal",
            src: ["./src/assets/fonts/standard-bold-webfont.woff2"],
          },
          {
            weight: "700",
            style: "italic",
            src: ["./src/assets/fonts/standard-bold-italic-webfont.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: ["100 800"],
      fallbacks: ["ui-monospace"],
    },
  ],
});
