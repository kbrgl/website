import Head from "next/head";
// eslint-disable-next-line import/no-unresolved
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";
import retextSmartypants from "retext-smartypants";
import remarkFrontmatter from "remark-frontmatter";
import remarkFootnotes from "remark-footnotes";
import calculateReadingTime from "reading-time";
import formatDate from "../../utils/format-date";
import Layout from "../../components/layout";
import Container from "../../components/container";

import styles from "../../styles/Note.module.css";

export default function Note({
  title,
  subtitle,
  date,
  html,
  slug,
  canonical,
  readingTime,
}) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>{title} · Kabir Goel</title>
          <meta name="description" content={subtitle} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={subtitle} />
          <meta property="og:image" content="https://kabirgoel.com/me.png" />
          <meta property="og:url" content={`https://kabirgoel.com/p/${slug}`} />
          <meta property="og:type" content="blog" />
          <meta name="twitter:card" content="summary_large_image" />
          {canonical ? <link rel="canonical" href={canonical} /> : null}
        </Head>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <p className={styles.meta}>
          {formatDate(new Date(date))} · {readingTime}
        </p>
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const filename = `${slug}.md`;
  const postsDirectory = path.join(process.cwd(), "content", "notes");
  const filePath = path.join(postsDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  const frontmatter = matter(fileContents).data;
  const processor = remark()
    .use(remarkFrontmatter)
    .use(retextSmartypants)
    .use(remarkFootnotes)
    .use(remarkHtml);
  const file = processor.processSync(fileContents);

  const html = String(file);
  const note = {
    ...frontmatter,
    slug,
    date: String(frontmatter.date),
    html,
    readingTime: calculateReadingTime(html).text,
  };

  return {
    props: {
      ...note,
    },
  };
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content", "notes");
  const filenames = await fs.readdir(postsDirectory, "utf8");

  return {
    paths: filenames.map((filename) => ({
      params: {
        slug: path.basename(filename, path.extname(filename)),
      },
    })),
    fallback: false,
  };
}
