import _ from "lodash";
import Layout from "../components/layout";
import Container from "../components/container";
import Project from "../components/project";
import Header from "../components/header";
import Title from "../components/title";
import Footer from "../components/footer";
import SectionHeading from "../components/section-heading";
import parseDate from "../utils/parse-date";
import projects from "../../content/projects.json";

export default function Projects({ projectsByYear, years }) {
  return (
    <Layout>
      <Header />
      <Container>
        <Title className="my-24">Projects</Title>
        {years.map((year) => (
          <section className="mb-24 space-y-6" key={year}>
            <SectionHeading>{year}</SectionHeading>
            <div className="gap-8 grid auto-rows-max grid-cols-1">
              {projectsByYear[year].map((project) => (
                <Project key={project.name} project={project} />
              ))}
            </div>
          </section>
        ))}
        <div className="pt-10" />
      </Container>
      <Footer />
    </Layout>
  );
}

export function getStaticProps() {
  const projectsByYear = _.groupBy(
    projects.sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    (project) => parseDate(project.date).getUTCFullYear()
  );
  const years = Object.keys(projectsByYear).sort((a, b) => b - a);
  return {
    props: {
      projectsByYear,
      years,
    },
  };
}
