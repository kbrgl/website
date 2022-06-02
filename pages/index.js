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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
      <Link href="/portfolio">
        <a className="p-4 bg-[#f2f5fa] text-[#1e5097] rounded-xl">
          <div className="flex space-x-1">
            <p className="mb-1">
              <CollectionIcon className="h-6 w-6" />
            </p>
            <p className="mb-1 md:mb-3 font-medium">Portfolio</p>
          </div>
          <p className="font-normal text-zinc-600 text-sm">
            My projects, including products and open-source code.
          </p>
        </a>
      </Link>
      <Link href="/recently">
        <a className="p-4 bg-[#f2f7f1] text-[#116719] rounded-xl">
          <div className="flex space-x-1">
            <p className="mb-1">
              <SparklesIcon className="h-6 w-6" />
            </p>
            <p className="mb-1 md:mb-3 font-medium">Recently</p>
          </div>
          <p className="font-normal text-zinc-600 text-sm">
            The things I’ve been up to, from projects to clubs to classes.
          </p>
        </a>
      </Link>
      <div className="p-4 bg-amber-50 text-amber-700 rounded-xl">
        <div className="flex space-x-1">
          <p className="mb-1 font-medium">
            <GlobeAltIcon className="h-6 w-6" />
          </p>
          <p className="mb-1 md:mb-3 font-medium">On the Web</p>
        </div>
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
      <p className="text-sm text-gray-500 md:col-span-3">
        See what I’m{" "}
        <Link href="/spotify">
          <a className="underline underline-offset-4 decoration-dotted decoration-gray-500">
            listening to
          </a>
        </Link>{" "}
        &rarr;
      </p>
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
      <Container>
        <img
          className="float-right h-32 w-32 rounded-full"
          style={{ shapeOutside: "circle()" }}
          src="/me.jpg"
          aria-label="A photograph of Kabir Goel with his face covered in colors"
          alt=""
        />
        <p className="mt-7 text-3xl md:text-4xl font-title font-bold max-w-prose">
          I’m a junior at UC&nbsp;Berkeley studying computer science, design,
          and public policy.
        </p>
        <p className="text-gray-700 mt-7 text-lg max-w-prose">
          I build tech for nonprofits at{" "}
          <a
            className="text-[#3d78bb] underline decoration-dotted underline-offset-4"
            href="https://calblueprint.org"
          >
            Cal Blueprint
          </a>{" "}
          and{" "}
          <a
            href="https://buttondown.email/kabir"
            className="text-[#382394] underline decoration-dotted underline-offset-4"
          >
            write a newsletter
          </a>{" "}
          about design, productivity, and programming. When I’m not building or
          writing I usually end up watching a Vox documentary or reading about
          economics, history, or politics.
        </p>
        <p className="text-gray-700 mt-3 text-lg max-w-prose">
          This summer I’m doing research in improving machine translation in
          high-stakes settings, advised by{" "}
          <a
            className="text-[#a5446d] underline decoration-dotted underline-offset-4"
            href="https://niloufar.org"
          >
            Prof. Niloufar Salehi
          </a>
          . Previously, I built a better way to invest in India at{" "}
          <a
            className="text-[#308141] underline decoration-dotted underline-offset-4"
            href="https://niloufar.org"
          >
            Swadesh
          </a>
          .
        </p>
        <p className="text-gray-700 mt-3 text-lg max-w-prose">
          I grew up in New Delhi, India. In Delhi, I led my high school’s{" "}
          <a
            href="https://exunclan.com"
            className="text-[#326bc7] underline decoration-dotted underline-offset-4"
          >
            tech club
          </a>{" "}
          and organized one of the largest high school hackathons in the
          country. When I go home I typically gain about 5 lbs. in butter
          chicken and naan.
        </p>
        <p className="text-gray-700 mt-3 text-lg max-w-prose">
          You should follow me on Twitter. I think I’m pretty funny.
        </p>
        <h2 className="font-medium border-t mt-10 pt-10 text-gray-500 text-sm clear-both">
          Quick Links
        </h2>
        <QuickLinks />
        <section className="border-t mt-10 pt-10 mb-7 text-center">
          <h2 className="text-4xl font-title font-bold">Posts</h2>
          <p className="mt-1 font-sans text-gray-500 font-normal">
            <NavbarLink href="https://buttondown.email/kabir">
              Get my writing in your inbox.
            </NavbarLink>
          </p>
        </section>
        <section>
          <ul className="mb-10 space-y-3">
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
