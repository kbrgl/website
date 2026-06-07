// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://kabirgoel.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
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
