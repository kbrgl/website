import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Subscribe from "../components/subscribe";
import Header from "../components/header";
import SectionHeading from "../components/section-heading";
import Title from "../components/title";

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <Container>
        <div className="pt-10" />
        <Title>I’m a sophomore studying CS & math at UC Berkeley.</Title>
        <p className="text-gray-500 mt-7">
          I design for impact at Blueprint, serve on the Alumni Leader­ship
          Council of the Conrad Foundation, and write a news­letter
          descriptively titled Kabir Talks About Stuff.
        </p>
        <section className="my-10">
          <SectionHeading>Posts</SectionHeading>
          <ul className="mt-5 space-y-5">
            {posts
              .map((post) => ({
                ...post,
                date: parseDate(post.dateString),
              }))
              .sort((a, b) => +b.date - +a.date)
              .map((post) => (
                <Link href={`/p/${post.slug}`}>
                  <a className="block" key={post.slug}>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.dateString}</p>
                  </a>
                </Link>
              ))}
          </ul>
        </section>
        <Subscribe />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDirectory);

  const posts = (
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
    .map(({ date, ...data }) => ({
      ...data,
      dateString: formatDate(date),
    }));

  return {
    props: {
      posts,
    },
  };
}
