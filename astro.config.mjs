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
      // تحويل تاريخ اليوم مباشرة إلى صيغة YYYY-MM-DD
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.7,
      filter: (page) => !page.includes("/author/") && !page.includes("/tags/"),
      serialize(item) {
        if (item.lastmod) {
          // التأكد من إرجاع التاريخ فقط لكل صفحة
          item.lastmod = new Date(item.lastmod).toISOString().split("T")[0];
        }
        return item;
      },
    }),
  ],
});