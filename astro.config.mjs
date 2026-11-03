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
      priority: 0.7,
      filter: (page) => !page.includes("/author/") && !page.includes("/tags/"),
      serialize(item) {
        // اقتطاع الجزء الخاص بالوقت وإبقاء التاريخ فقط بصيغة YYYY-MM-DD
        const dateStr = item.lastmod ? new Date(item.lastmod).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10);
        
        return {
          ...item,
          lastmod: dateStr,
        };
      },
    }),
  ],
});