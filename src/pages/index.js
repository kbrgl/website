import _ from "lodash";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";
import Post from "../components/post";
import SectionHeading from "../components/section-heading";
import { QuickLinks } from "../components/quick-links";
import Project from "../components/project";
import getPosts from "../utils/get-posts";

export default function Home({ postsByYear, years }) {
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
        <p className="body-text">
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
        <p className="mt-4 body-text">
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
        <p className="mt-4 body-text">
          I grew up in New Delhi, India. In Delhi, I led my high school’s{" "}
          <a href="https://exunclan.com" className="link text-[#326bc7]">
            tech club
          </a>{" "}
          and organized one of the largest high school hackathons in the
          country. When I go home I typically gain about 5 lbs. in butter
          chicken and naan.
        </p>
        <p className="mt-4 body-text">
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
              Get posts in your inbox ↗
            </a>
          </p>
          <ul className="mb-10 space-y-12">
            {years.map((year) => (
              <section className="space-y-6" key={year}>
                <SectionHeading>{year}</SectionHeading>
                <div className="gap-4 grid auto-rows-max grid-cols-1">
                  {postsByYear[year].map((item) =>
                    item.type === "project" ? (
                      <Project key={item.name} project={item} />
                    ) : (
                      <Post key={item.title} post={item} />
                    )
                  )}
                </div>
              </section>
            ))}
          </ul>
        </section>
      </Container>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  const postsByYear = _.groupBy(
    posts.sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    (item) => parseDate(item.date).getUTCFullYear()
  );
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  return {
    props: {
      postsByYear,
      years,
    },
  };
}
