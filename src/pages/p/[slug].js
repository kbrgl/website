import Head from "next/head";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import retextSmartypants from "retext-smartypants";
import remarkFrontmatter from "remark-frontmatter";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import calculateReadingTime from "reading-time";
import formatDate from "../../utils/format-date";
import Layout from "../../components/layout";
import Container from "../../components/container";
import Subscribe from "../../components/subscribe";
import Header from "../../components/header";
import Footer from "../../components/footer";

import styles from "../../styles/Post.module.css";
import getPosts from "../../utils/get-posts";

export default function Post({
  title,
  subtitle,
  date,
  preview,
  html,
  slug,
  canonical,
  readingTime,
  previous,
  next,
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
      <Container className="max-w-prose">
        <div className="mt-10">
          <p className="text-sm text-gray-500 mb-5">
            {formatDate(new Date(date))} · {readingTime}
          </p>
          <h1 className="font-sans text-4xl font-bold">{title}</h1>
          <h2 className="text-xl text-gray-500 leading-tight mt-4 font-serif">
            {subtitle}
          </h2>
        </div>
        <div
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="my-12">
          <p className="leading-snug font-medium mb-2">
            Get more like this in your inbox.
          </p>
          <Subscribe />
        </div>

        <div className="my-12 flex">
          {previous && (
            <Link href={`/p/${previous.slug}`}>
              <a className="self-start block rounded-full py-3 px-5 bg-gray-50 ring-1 ring-gray-200 text-gray-500 leading-none">
                &larr; Previous
              </a>
            </Link>
          )}
          {next && (
            <Link href={`/p/${next.slug}`}>
              <a className="ml-auto block rounded-full py-3 px-5 bg-gray-50 ring-1 ring-gray-200 text-gray-500 leading-none">
                Next &rarr;
              </a>
            </Link>
          )}
        </div>
      </Container>
      <Footer />
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
    .use(remarkGfm)
    .use(retextSmartypants)
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });
  const file = processor.processSync(fileContents);

  const html = String(file);
  const note = {
    ...frontmatter,
    slug,
    date: String(frontmatter.date),
    html,
    readingTime: calculateReadingTime(html).text,
  };

  const posts = await getPosts();
  const idx = posts.findIndex((post) => post.slug === slug);
  let previous = null;
  if (idx > 0) {
    previous = posts[idx - 1];
  }
  let next = null;
  if (idx < posts.length - 1) {
    next = posts[idx + 1];
  }

  return {
    props: {
      ...note,
      previous,
      next,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
