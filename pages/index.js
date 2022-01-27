import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Subscribe from "../components/subscribe";
import Header from "../components/header";
import Footer from "../components/footer";
import Title from "../components/title";
import NowPlaying from "../components/now-playing";

function Me() {
  return (
    <div className="overflow-hidden relative inline-block">
      <Image
        className="rounded-full"
        layout="fixed"
        height={120}
        width={120}
        priority
        quality={100}
        src="/me.jpg"
        alt="Me"
      />
    </div>
  );
}

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <div className="pt-10" />
      <Container>
        <Me />
        <div className="pt-4" />
        <Title>I’m a sophomore studying CS &amp; design at UC Berkeley.</Title>
        <p className="text-gray-500 my-7 text-lg max-w-prose">
          I design for impact at{" "}
          <a className="text-[#3d78bb]" href="https://calblueprint.org">
            Cal Blueprint
          </a>
          , serve on the Alumni Leader&shy;ship Council of the{" "}
          <a className="text-[#15489f]" href="https://conradchallenge.org">
            Conrad Foundation
          </a>
          , and write a news&shy;letter descriptively titled{" "}
          <a className="text-[#382394]" href="https://buttondown.email/kabir">
            Kabir&nbsp;Talks&nbsp;About&nbsp;Stuff
          </a>
          .
        </p>
        <Subscribe />
        <section className="my-10">
          <h2 className="text-3xl font-serif">Posts</h2>
          <ul className="mt-5 mb-10 space-y-3">
            {posts
              .map((post) => ({
                ...post,
                date: parseDate(post.dateString),
              }))
              .sort((a, b) => +b.date - +a.date)
              .map((post) => (
                <Link href={`/p/${post.slug}`} key={post.slug}>
                  <a
                    className="block p-5 bg-gray-50 hover:text-white hover:bg-accent transition-colors rounded-xl group"
                    key={post.slug}
                  >
                    <p className="text-lg font-medium mb-1">
                      {post.title}&nbsp;
                      <span className="group-hover:ml-2 transition-[margin]">
                        &rarr;
                      </span>
                    </p>
                    <p className="text-gray-500 group-hover:text-white transition-colors pb-2">
                      {post.subtitle}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-white transition-colors">
                      {post.dateString}
                    </p>
                  </a>
                </Link>
              ))}
          </ul>
          <div>
            <NowPlaying />
            <p className="mt-3 text-gray-500">
              See what I’ve been{" "}
              <Link href="/spotify">
                <a className="text-gray-700">
                  <span className="decoration-gray-300 underline decoration-2">
                    listening to
                  </span>{" "}
                  &rarr;
                </a>
              </Link>{" "}
            </p>
          </div>
        </section>
        <Footer />
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
