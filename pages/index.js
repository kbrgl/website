import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Header, { NavbarLink } from "../components/header";
import Footer from "../components/footer";
import Title from "../components/title";

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <Container>
        <section>
          <Title>
            I’m a junior studying computer science, design, and public policy at
            UC&nbsp;Berkeley.
          </Title>
          <p className="text-gray-700 leading-relaxed max-w-prose">
            I build tech for nonprofits at{" "}
            <a className="link text-[#3d78bb]" href="https://calblueprint.org">
              Cal Blueprint
            </a>{" "}
            and{" "}
            <a
              href="https://buttondown.email/kabir"
              className="link text-[#382394]"
            >
              write a newsletter
            </a>{" "}
            about design, productivity, and programming. When I’m not building
            or writing I usually end up watching a Vox documentary or reading
            about economics, history, or politics.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed max-w-prose">
            This summer I’m doing research in improving machine translation in
            high-stakes settings, advised by{" "}
            <a className="link text-[#a5446d]" href="https://niloufar.org">
              Prof. Niloufar Salehi
            </a>
            . Previously, I built a better way to invest in India at{" "}
            <a className="link text-[#308141]" href="https://niloufar.org">
              Swadesh
            </a>
            .
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed max-w-prose">
            I grew up in New Delhi, India. In Delhi, I led my high school’s{" "}
            <a href="https://exunclan.com" className="link text-[#326bc7]">
              tech club
            </a>{" "}
            and organized one of the largest high school hackathons in the
            country. When I go home I typically gain about 5 lbs. in butter
            chicken and naan.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed max-w-prose">
            You should follow me on{" "}
            <a className="link" href="https://twitter.com/KabirGoel">
              Twitter
            </a>
            . I think I’m pretty funny.
          </p>
          <p className="mt-12">
            <a
              className="font-serif rounded-full border px-3 py-0.5"
              href="https://read.cv/kabirgoel"
            >
              Portfolio ↗
            </a>
          </p>
        </section>
        <section className="border-t border-b mt-10 pt-10">
          <h2 className="text-2xl font-title">Posts</h2>
          <p className="mt-1 font-sans text-gray-500 font-normal">
            <NavbarLink href="https://buttondown.email/kabir">
              Get my writing in your inbox.
            </NavbarLink>
          </p>
          <ul className="my-10 space-y-5">
            {posts
              .map((post) => ({
                ...post,
                date: parseDate(post.dateString),
              }))
              .sort((a, b) => +b.date - +a.date)
              .map((post) => (
                <Link href={`/p/${post.slug}`} key={post.slug}>
                  <a className="block space-y-1 group" key={post.slug}>
                    <p className="font-medium link group-hover:text-accent transition-colors">
                      {post.title}
                    </p>
                    <p className="text-gray-500 transition-colors pb-2">
                      {post.subtitle}
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
