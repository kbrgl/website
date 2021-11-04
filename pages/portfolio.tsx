import Layout from "../components/layout";
import Container from "../components/container";
import Project from "../components/project";
import styles from "../styles/Portfolio.module.css";

const products = [
  {
    name: "Lipwig",
    description:
      "Provides an email address for your Discord or Slack community, which you can use to sign up for newsletters, forward emails from your support team’s inbox, and more.",
    link: "https://lipwig.email",
    image: "lipwig.png",
  },
  {
    name: "Unslant",
    description:
      "Browser extension that surfaces contrasting takes on political news as you read. Available for Chrome.",
    link: "https://unslant.github.io",
    image: "unslant.png",
  },
  {
    name: "Rucksack",
    description:
      "Open source and self-hosted alternative to Substack and Revue with subscriber analytics, theming support, drafts, and a full-fledged dashboard. Built on Rails 6 and React.",
    link: "https://github.com/kbrgl/rucksack",
    image: "rucksack.png",
  },
  {
    name: "Wayfer",
    description:
      "Wi-Fi based file transfer app. Just drop a file and scan the code.",
    link: "https://github.com/kbrgl/wayfer",
    image: "wayfer.png",
  },
  {
    name: "Exun 2018",
    description:
      "Event app for Exun 2018, the 24th annual festival of Delhi Public School, R.K. Puram’s technology club. Used to deliver 55,000 notifications to hundreds of devices.",
    link: "https://github.com/kbrgl/exun2018",
    image: "exun-2018.png",
  },
];

const code = [
  {
    name: "Aech",
    description:
      "A CSS starter kit optimized to provide reasonable defaults so you need minimal styling to get something that looks pretty. Used on this website!",
    link: "https://kbrgl.github.io/aech",
    image: "aech.png",
  },
  {
    name: "koa-auth-basic",
    description: "A Koa middleware for HTTP Basic authentication.",
    link: "https://github.com/kbrgl/koa-auth-basic",
    image: "koa-auth-basic.png",
  },
  {
    name: "Walnut",
    description:
      "A Brainf*** to Go transpiler with some optimizations, including loops. Based on Rob Pike’s famous talk “Lexical Scanning in Go.”",
    link: "https://github.com/kbrgl/walnut",
    image: "walnut.png",
  },
  {
    name: "Roller",
    description:
      "A fast and memory-efficient text truncation utility written in Rust, for use with window managers like i3 and bspwm.",
    link: "https://github.com/kbrgl/roller",
    image: "roller.png",
  },
  {
    name: "Isnochys Syntax",
    description:
      "“In space, no one can hear you scream.” A high-contrast Atom syntax theme that's easy on the eyes.",
    link: "https://github.com/kbrgl/isnochys-syntax",
    image: "isnochys-syntax.png",
  },
  {
    name: "Fu",
    description:
      "Unix’s Find, Unleashed. An intuitive alternative to the Unix “find” command.",
    link: "https://github.com/kbrgl/fu",
    image: "fu.png",
  },
];

export default function Portfolio() {
  return (
    <Layout>
      <Container>
        <h1 className={styles.title}>Portfolio</h1>
        <p>
          These are most of the things I’ve built, but not all of them! You
          might find more on my <a href="">GitHub profile</a>.
        </p>
        <section>
          <h2 className={styles.subheading}>Products</h2>
          <div className={styles.projects}>
            {products.map((product) => (
              <Project key={product.name} project={product} />
            ))}
          </div>
        </section>
        <section>
          <h2 className={styles.subheading}>Code</h2>
          <div className={styles.projects}>
            {code.map((project) => (
              <Project key={project.name} project={project} />
            ))}
          </div>
        </section>
        <p className={styles.ending}>That’s all—at least for now.</p>
      </Container>
    </Layout>
  );
}
