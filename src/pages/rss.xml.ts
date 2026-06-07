import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export const GET = (async (context) => {
  if (!context.site) {
    throw new Error("Please set `site` config in Astro config");
  }
  const posts = await getCollection("posts");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/p/${post.id}/`,
    })),
  });
}) satisfies APIRoute;
