import Head from "next/head";
import { promises as fs } from "fs";
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
import Header from "../../components/header";
import Subscribe from "../../components/subscribe";
import Footer from "../../components/footer";

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
      </Head>
      <Header />
      <Container>
        <div className="mt-10">
          <p className="text-sm text-gray-500 mb-5">
            {formatDate(new Date(date))} · {readingTime}
          </p>
          <h1 className="text-3xl font-bold mt-3 leading-tight whitespace-pre-line">
            {title}
          </h1>
          <h2 className="text-xl text-gray-500 mt-2 leading-tight">
            {subtitle}
          </h2>
        </div>
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="py-10 border-t">
          <Subscribe />
        </div>
        <Footer />
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
