import type { APIRoute } from "astro";
import { projects } from "@/data/projects";

const postModules = import.meta.glob("../pages/posts/*.astro", { eager: true });
const posts = Object.values(postModules)
  .map((mod: any) => mod.post)
  .filter(Boolean)
  .sort((a: any, b: any) => b.pubDate.valueOf() - a.pubDate.valueOf());

const wikiModules = import.meta.glob("../pages/wiki/*.astro", { eager: true });
const wikiPages = Object.entries(wikiModules)
  .filter(([path]) => !path.endsWith("index.astro"))
  .map(([path, mod]: [string, any]) => {
    const slug = path.split("/").pop()?.replace(".astro", "") ?? "";
    const w = mod.wiki ?? {};
    return {
      slug,
      title: w.title ?? "",
      description: w.description ?? "",
      tags: w.tags ?? [],
      category: w.category ?? ["موسوعة"],
      thumbnail: w.thumbnail ?? "",
      url: `/wiki/${slug}/`,
    };
  });

const searchData = [
  ...posts.map((p: any) => ({
    type: "post",
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags || [],
    category: Array.isArray(p.category) ? p.category : [p.category],
    thumbnail: p.thumbnail || "",
    url: `/posts/${p.slug}/`,
  })),
  ...projects.map((p) => ({
    type: "project",
    slug: p.slug,
    title: p.name,
    description: p.description,
    tags: p.tags || [],
    category: Array.isArray(p.category) ? p.category : [p.category],
    thumbnail: p.thumbnail || "",
    url: `/projects/${p.slug}/`,
  })),
  ...wikiPages.map((w) => ({
    type: "wiki",
    slug: w.slug,
    title: w.title,
    description: w.description,
    tags: w.tags,
    category: w.category,
    thumbnail: w.thumbnail,
    url: w.url,
  })),
];

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(searchData), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
