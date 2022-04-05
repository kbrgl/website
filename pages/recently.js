import Layout from "../components/layout";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";
import Title from "../components/title";
import SectionHeading from "../components/section-heading";

function Class({ code, title }) {
  return (
    <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
      <p className="font-medium">{code}</p>
      <p className="text-gray-500">{title}</p>
    </div>
  );
}

export default function Recently() {
  return (
    <Layout>
      <Header />
      <div className="pt-10" />
      <Container>
        <center>
          <Title>Recently</Title>
          <p className="text-gray-600 mt-3 text-xl">
            The things I’ve been up to.
          </p>
        </center>
        <section className="mt-10">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            controls
            muted
            className="h-[600px] rounded-3xl border mx-auto shadow"
            src="/twine-figma.mp4"
          />
          <p className="text-gray-400 text-sm text-center mt-3">
            Figma prototype of Twine
          </p>
          <div className="pt-10" />
          <SectionHeading>Twine</SectionHeading>
          <p className="mt-3 text-gray-600">
            I’m working on Twine, an iOS app for personal microblogs. Compose in
            the app and publish, and content magically appears on your personal
            website through a React integration.
          </p>
        </section>
        <section className="mt-10">
          <SectionHeading>Blueprint</SectionHeading>
          <p className="mt-3 text-gray-600">
            This semester, I’m leading the{" "}
            <a
              className="underline"
              href="https://calblueprint.org/projects/alemany"
            >
              Friends of Alemany Farm
            </a>{" "}
            project for Cal Blueprint, where I was previously a designer.
          </p>
        </section>
        <section className="my-10 clear-both">
          <SectionHeading>Classes</SectionHeading>
          <ul className="mt-3 grid auto-rows-auto grid-cols-2 gap-4">
            <Class code="CS 61C" title="Machine Structures" />
            <Class code="CS 70" title="Discrete Math &amp; Probability" />
            <Class code="SASIAN 142" title="India’s Great Epics" />
            <Class code="INFO 290" title="Advanced HCI Research" />
            <Class
              code="PUBPOL 198"
              title="National Security &amp; Tech Policy"
            />
          </ul>
        </section>
      </Container>
      <Footer />
    </Layout>
  );
}
