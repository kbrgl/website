// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// TODO: remove once astro/vite fixes bundling of packages that use
// createRequire(import.meta.url) for relative file loading in the prerender
// container. Tracked upstream: astro bundles its own dependencies (including
// css-tree v2/v3) into the prerender container; when bundled, import.meta.url
// resolves to the bundle path, breaking relative requires like
// require('../data/patch.json'). This plugin pins each module's import.meta.url
// to its original source path so the relative requires still resolve correctly.
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
    plugins: [
      tailwindcss(),
      preserveImportMetaUrlPlugin(), // TODO: remove when upstream is fixed (see above)
    ],
    build: {
      rollupOptions: {
        // TODO: remove "fsevents" once rollup stops trying to resolve this
        // macOS-only optional dep on non-macOS platforms during prerender.
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
