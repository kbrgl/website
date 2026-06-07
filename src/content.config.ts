import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: ["*.md", "*/index.md"],
    base: "./data/posts",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, "").replace(/\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.coerce.date(),
      preview: z.optional(image()),
      hidden: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: file("./data/projects.json"),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      link: z.url(),
      image: z.string().nullable(),
      date: z.coerce.date(),
    }),
});

export const collections = { posts, projects };
