// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Some node_modules use createRequire(import.meta.url) to load files at paths
// relative to their own location (e.g. css-tree loading patch.json or package.json).
// When Vite bundles these into the prerender container, import.meta.url resolves to
// the bundle path instead of the original file path, so relative requires break.
// Rollup's resolveImportMeta hook lets us pin each module's import.meta.url to its
// original source path before bundling, fixing the path calculations.
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

// https://astro.build/config
export default defineConfig({
  site: "https://kabirgoel.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss(), preserveImportMetaUrlPlugin()],
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
