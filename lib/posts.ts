import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {groupBy} from "lodash-es";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeShiki from "@shikijs/rehype";

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeShiki, {
		theme: "vitesse-dark",
	  })
	.use(rehypeStringify, {
		allowDangerousHtml: true,
	});

const CONTENT_DIR = path.join(process.cwd(), "data");

type Post = {
	slug: string;
	data: { [key: string]: any };
	date: Date;
};

export async function getPosts(): Promise<Post[]> {
	const fileNames = await fs.readdir(path.join(CONTENT_DIR, "posts"));

	const posts = await Promise.all(
		fileNames
			.filter((fileName) => path.extname(fileName) === ".md")
			.map(async (fileName) => {
				const slug = path.basename(fileName, ".md");
				const fullPath = path.join(CONTENT_DIR, "posts", fileName);
				const fileContents = await fs.readFile(fullPath, "utf8");

				const { data } = matter(fileContents);

				return {
					slug,
					data,
					date: new Date(data.date),
				};
			}),
	);

	return posts.filter((post) => !post.data.hidden).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getPostsByYear(): Promise<[string, Post[]][]> {
	const posts = await getPosts();
	return Object.entries(groupBy(posts, (post) => post.date.getFullYear()));
}

type PostWithContent = Post & { content: string };

export async function getPost(slug: string): Promise<PostWithContent> {
	const filePath = path.join(CONTENT_DIR, "posts", `${slug}.md`);
	const source = await fs.readFile(filePath, "utf-8");

	const { data, content } = matter(source);

	const result = await processor.process(content);

	return { slug, data, content: String(result), date: new Date(data.date) };
}
