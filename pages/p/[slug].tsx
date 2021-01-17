import Head from "next/head";
import Link from "next/link";
// eslint-disable-next-line import/no-unresolved
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";
import retextSmartypants from "retext-smartypants";
import remarkFrontmatter from "remark-frontmatter";
import remarkFootnotes from "remark-footnotes";
import remarkPrism from "remark-prism";
import calculateReadingTime from "reading-time";
import formatDate from "../../utils/format-date";
import Layout from "../../components/layout";
import Container from "../../components/container";

import styles from "../../styles/Post.module.css";

export default function Post({
  title,
  subtitle,
  date,
  preview,
  html,
  slug,
  canonical,
  readingTime,
}) {
  const postLink = `https://kabirgoel.com/p/${slug}`;
  const imageLink =
    preview ||
    `https://og-image-swart.vercel.app/${encodeURIComponent(
      `**${title}**`
    )}?md=1`;
  return (
    <Layout>
      <Head>
        <title>{title} · Kabir Goel</title>
        <meta name="description" content={subtitle} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image" content={imageLink} />
        <meta property="og:url" content={postLink} />
        <meta property="og:type" content="blog" />
        <meta name="twitter:card" content="summary_large_image" />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        <style>
          {`:root {
            --container-size: 720px;
          }`}
        </style>
      </Head>
      <Container>
        <div className={styles.header}>
          <p className={styles.meta}>
            {formatDate(new Date(date))} · {readingTime}
          </p>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.subtitle}>{subtitle}</h2>
        </div>
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className={styles.footer}>
          <div className={styles.author}>
            <img src="/me.png" alt="Me" />
            <p>
              Written by Kabir Goel, a freshman at Berkeley.{" "}
              <Link href="/#writing">
                <a>Read&nbsp;more&nbsp;&rarr;</a>
              </Link>
            </p>
          </div>
          <p className={styles.share}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                postLink
              )}`}
            >
              Discuss on Twitter
            </a>{" "}
            · <a href="mailto:kabirgoel.kg@gmail.com">Shoot me an email</a>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const filename = `${slug}.md`;
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const filePath = path.join(postsDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  const frontmatter = matter(fileContents).data;
  const processor = remark()
    .use(remarkFrontmatter)
    .use(retextSmartypants)
    .use(remarkFootnotes)
    .use(remarkPrism)
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
  const postsDirectory = path.join(process.cwd(), "content", "posts");
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
