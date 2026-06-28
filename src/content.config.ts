import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: ["*.md", "*/index.md"],
    base: "./data/posts",
    generateId: ({ entry }) =>
      entry.replace(/\/index\.md$/, "").replace(/\.md$/, ""),
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

const Note = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

type Note = z.infer<typeof Note>;

const notes = defineCollection({
  loader: {
    name: "notes-loader",
    async load({ renderMarkdown, store, parseData, logger }) {
      const PAGE_SIZE = 100;
      const entries: Note[] = [];
      let offset = 0;

      while (true) {
        const batch = await fetch(
          `https://notes.kabirgoel.com/notes?limit=${PAGE_SIZE}&offset=${offset}`,
        ).then((r) => r.json());

        entries.push(...batch);

        if (batch.length < PAGE_SIZE) break;
        offset += PAGE_SIZE;
      }

      logger.info(`Loaded ${entries.length} notes`);

      store.clear();

      for (const entry of entries) {
        entry.id = String(entry.id);
        const data = await parseData({
          id: entry.id,
          data: entry,
        });
        store.set({
          id: entry.id,
          data,
          // Assume each entry has a 'content' field with markdown content
          rendered: await renderMarkdown(entry.content),
        });
      }
    },
    schema: Note,
  },
});

export const collections = { posts, projects, notes };
