import Layout from "../components/layout";
import Container from "../components/container";
import Project from "../components/project";
import Header from "../components/header";
import Title from "../components/title";
import Footer from "../components/footer";

const projects = [
  {
    name: "Svelte French Toast",
    description:
      "Buttery smooth toast notifications for Svelte. Lightweight, customizable, and beautiful by default. Inspired by React Hot Toast.",
    link: "https://svelte-french-toast.com",
    image: "svelte-french-toast.png",
  },
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
      "Open source, self-hosted alternative to Substack and Revue with subscriber analytics, theming, drafts, and a dashboard. Built on Rails and React.",
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
      "Event app for Exun 2018, the 24th annual festival of my high school technology club. Used to deliver 55,000 notifications to hundreds of devices.",
    link: "https://github.com/kbrgl/exun2018",
    image: "exun-2018.png",
  },
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

export default function Projects() {
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
          {projects.map((product) => (
            <Project key={product.name} project={product} />
          ))}
        </div>
        <div className="pt-10" />
      </Container>
      <Footer />
    </Layout>
  );
}