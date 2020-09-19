import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";
import retextSmartypants from "retext-smartypants";
import remarkFrontmatter from "remark-frontmatter";
import remarkFootnotes from "remark-footnotes";
import readingTime from "reading-time";
import formatDate from "../../utils/format-date";
import Layout from "../../components/layout";
import Container from "../../components/container";

import styles from "../../styles/Note.module.css";

export default function Note({ title, date, html, readingTime }) {
  return (
    <Layout>
      <Container>
        <h1>{title}</h1>
        <p className={styles.meta}>
          {formatDate(new Date(date))} · {readingTime.text}
        </p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const filename = `${params.slug}.md`;
  const postsDirectory = path.join(process.cwd(), "content", "notes");
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const frontmatter = matter(fileContents).data;
  const processor = remark()
    .use(remarkFrontmatter)
    .use(retextSmartypants)
    .use(remarkFootnotes)
    .use(remarkHtml);
  const file = await processor.processSync(fileContents);

  const html = String(file);
  const note = {
    ...frontmatter,
    slug: path.basename(filename, path.extname(filename)),
    date: String(frontmatter.date),
    html,
    readingTime: readingTime(html),
  };

  return {
    props: {
      ...note,
    },
  };
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content", "notes");
  const filenames = await fs.readdirSync(postsDirectory);

  return {
    paths: filenames.map((filename) => ({
      params: {
        slug: path.basename(filename, path.extname(filename)),
      },
    })),
    fallback: false,
  };
}
