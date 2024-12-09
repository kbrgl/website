import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import _ from "lodash-es";
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

export async function getPosts() {
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

	return posts.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getPostsByYear() {
	const posts = await getPosts();
	return _.chain(posts)
		.filter((post) => !post.data.hidden)
		.groupBy((post) => post.date.getFullYear())
		.toPairs()
		.value();
}

export async function getPost(slug: string) {
	const filePath = path.join(CONTENT_DIR, "posts", `${slug}.md`);
	const source = await fs.readFile(filePath, "utf-8");

	const { data, content } = matter(source);

	const result = await processor.process(content);

	return { data, content: String(result), date: new Date(data.date) };
}
