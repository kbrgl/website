import Layout from "../components/layout";
import Container from "../components/container";
import Project from "../components/project";
import Header from "../components/header";
import Title from "../components/title";
import Footer from "../components/footer";
import parseDate from "../utils/parse-date";

import projects from "../../content/projects.json";

export default function Projects({ projects }) {
  return (
    <Layout>
      <Header />
      <Container>
        <p className="mt-12 mb-5 text-sm uppercase font-bold text-gray-500 tracking-widest">
          Projects
        </p>
        <Title className="mb-12">
          My favorite projects, including hacks, libraries, and experiments.
        </Title>
        <div className="gap-5 grid auto-rows-max grid-cols-1">
          {projects.map((project) => (
            <Project key={project.name} project={project} />
          ))}
        </div>
        <div className="pt-10" />
      </Container>
      <Footer />
    </Layout>
  );
}

export function getStaticProps() {
  return {
    props: {
      projects: projects.sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    },
  };
}
