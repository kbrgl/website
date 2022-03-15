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
import Footer from "../components/footer";
import Title from "../components/title";
import NowPlaying from "../components/now-playing";

const PortfolioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const RecentlyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

function Links() {
  return (
    <div className="grid grid-cols-3 gap-4 my-5">
      <Link href="/portfolio">
        <a className="p-4 pb-12 bg-gray-50 text-yellow-600 rounded-xl font-medium">
          <p className="text-yellow-400 mb-1">
            <PortfolioIcon />
          </p>
          <p>Portfolio</p>
        </a>
      </Link>
      <Link href="/recently">
        <a className="p-4 pb-12 bg-lime-50 text-lime-600 rounded-xl font-medium">
          <p className="text-lime-400 mb-1">
            <RecentlyIcon />
          </p>
          <p>Recently</p>
        </a>
      </Link>
      <div className="p-4 pb-12 bg-gray-50 text-blue-600 rounded-xl font-medium">
        <p className="text-blue-400 mb-1">
          <GlobeIcon />
        </p>
        <p>On the Web</p>
      </div>
    </div>
  );
}

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <div className="pt-10" />
      <Container>
        <Title className="text-center">
          I’m a sophomore studying CS &amp; design at UC Berkeley.
        </Title>
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
        <Links />
        <Subscribe />
        <section className="my-10">
          <h2 className="text-3xl font-serif font-bold">Posts</h2>
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
