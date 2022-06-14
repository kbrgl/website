import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import formatDate from "./format-date";

export default async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDirectory);

  return (
    await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const frontmatter = matter(fileContents).data;

        return {
          ...frontmatter,
          slug: path.basename(filename, path.extname(filename)),
        };
      })
    )
  )
    .filter(({ hidden }) => !hidden)
    .sort((a, b) => b.date - a.date)
    .map(({ date, ...data }) => {
      return {
        ...data,
        date: formatDate(date),
      };
    });
}
