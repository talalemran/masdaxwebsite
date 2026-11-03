import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://www.masdarx.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "daily",
      lastmod: new Date(),
      priority: 0.7,
      filter: (page) => !page.includes("/author/") && !page.includes("/tags/"),
    }),
  ],
});