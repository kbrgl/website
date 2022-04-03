import { useState } from "react";
import { promises as fs } from "fs";
import {
  CollectionIcon,
  GlobeAltIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import { RssIcon } from "@heroicons/react/solid";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Header, { NavbarLink } from "../components/header";
import Footer from "../components/footer";
import NowPlaying from "../components/now-playing";
import Subscribe from "../components/subscribe";

function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-4 my-3">
      <Link href="/portfolio">
        <a className="p-4 bg-[#f2f5fa] text-[#1e5097] rounded-xl">
          <p className="mb-1">
            <CollectionIcon className="h-6 w-6" />
          </p>
          <p className="mb-3 font-medium">Portfolio</p>
          <p className="font-normal text-zinc-600 text-sm">
            My projects, including products and open-source code.
          </p>
        </a>
      </Link>
      <Link href="/recently">
        <a className="p-4 bg-[#f2f7f1] text-[#116719] rounded-xl">
          <p className="mb-1">
            <SparklesIcon className="h-6 w-6" />
          </p>
          <p className="mb-3 font-medium">Recently</p>
          <p className="font-normal text-zinc-600 text-sm">
            The things I’ve been up to, from projects to clubs to classes.
          </p>
        </a>
      </Link>
      <div className="p-4 bg-amber-50 text-amber-700 rounded-xl">
        <p className="mb-1 font-medium">
          <GlobeAltIcon className="h-6 w-6" />
        </p>
        <p className="mb-3 font-medium">On the Web</p>
        <div className="text-zinc-600 text-sm">
          <p>
            Find me on{" "}
            <NavbarLink href="https://twitter.com/KabirGoel">
              Twitter
            </NavbarLink>{" "}
            or <NavbarLink href="https://github.com/kbrgl">GitHub</NavbarLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home({ posts }) {
  const [subscribeFormOpen, setSubscribeFormOpen] = useState(false);
  const handleSubscribeClick = () => {
    setSubscribeFormOpen(!subscribeFormOpen);
  };

  return (
    <Layout>
      <Header />
      <img
        className="w-full h-80 md:h-96 object-cover border-b border-black"
        style={{
          objectPosition: "50% 60%",
        }}
        src="/taj.jpeg"
        alt=""
      />
      <Container>
        <p className="text-gray-700 mt-10 mb-5 text-lg max-w-prose">
          I’m a sophomore at UC&nbsp;Berkeley studying computer&nbsp;science,
          design, and public&nbsp;policy.
        </p>
        <p className="text-gray-700 mb-8 text-lg max-w-prose">
          I build tech for nonprofits at{" "}
          <a
            className="text-[#3d78bb] underline decoration-dotted underline-offset-4"
            href="https://calblueprint.org"
          >
            Cal Blueprint
          </a>
          , serve on the Alumni Leader&shy;ship Council of the{" "}
          <a
            className="text-[#15489f] underline decoration-dotted underline-offset-4"
            href="https://conradchallenge.org"
          >
            Conrad Foundation
          </a>
          , and{" "}
          <a
            href="https://buttondown.email/kabir"
            className="text-[#382394] underline decoration-dotted underline-offset-4"
          >
            write a newsletter
          </a>{" "}
          about design, productivity, and programming.
        </p>
        <h2 className="font-medium text-gray-500 text-sm">Quick Links</h2>
        <QuickLinks />
        <section className="my-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-title font-bold">Posts</h2>
            <button
              type="button"
              className="py-1 px-4 rounded-full border hover:bg-gray-50 transition-colors text-gray-500 flex items-center space-x-1"
              onClick={handleSubscribeClick}
            >
              <RssIcon className="h-5 w-5" />
              <span className="pb-px">Subscribe</span>
            </button>
          </div>
          <p className="mt-1 font-sans text-gray-500 text-lg font-normal">
            Favorites from my newsletter
          </p>
          {subscribeFormOpen && (
            <div className="mt-4">
              <Subscribe minimal />
            </div>
          )}
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
      </Container>
      <Footer />
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
