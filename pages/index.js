import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";
import { QuickLinks } from "../components/quick-links";

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <Container>
        <div className="py-8">
          <img
            className="float-right h-32 w-32 rounded-full"
            style={{ shapeOutside: "circle()" }}
            src="/me.jpg"
            aria-label="A photograph of Kabir Goel with his face covered in colors"
            alt=""
          />
          <h1 className="text-3xl md:text-4xl font-title font-bold max-w-prose">
            I’m a junior at UC&nbsp;Berkeley studying computer science, design,
            and public policy.
          </h1>
        </div>
        <p className="text-gray-700 text-lg max-w-prose">
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
          about design, productivity, and programming. When I’m not building or
          writing I usually end up watching a Vox documentary or reading about
          economics, history, or politics.
        </p>
        <p className="text-gray-700 mt-4 text-lg max-w-prose">
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
        <p className="text-gray-700 mt-4 text-lg max-w-prose">
          I grew up in New Delhi, India. In Delhi, I led my high school’s{" "}
          <a href="https://exunclan.com" className="link text-[#326bc7]">
            tech club
          </a>{" "}
          and organized one of the largest high school hackathons in the
          country. When I go home I typically gain about 5 lbs. in butter
          chicken and naan.
        </p>
        <p className="text-gray-700 mt-4 text-lg max-w-prose">
          You should follow me on{" "}
          <a className="link" href="https://twitter.com/KabirGoel">
            Twitter
          </a>
          . I think I’m pretty funny.
        </p>

        <h2 className="font-medium border-t mt-10 pt-10 text-gray-500 text-sm clear-both">
          Quick Links
        </h2>
        <QuickLinks />

        <section className="border-t mt-12 pt-10 mb-6">
          <h2 className="text-4xl font-title font-bold text-center">Posts</h2>
          <p className="text-gray-500 mt-1 mb-6 text-center">
            <a href="https://buttondown.email/kabir">
              Get them in your inbox ↗
            </a>
          </p>
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
