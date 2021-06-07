import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/Garden.module.css";

function Patches({ children }) {
  return <div className={styles.patches}>{children}</div>;
}

function opacity(hex, alpha) {
  // Adapted from https://stackoverflow.com/a/40008105.
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Patch({ accent, title, description, link, className = "" }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={link}
      className={`${styles.patch} ${className}`}
      style={{
        ["--accent" as string]: accent,
        ["--background" as string]: opacity(accent, 0.05),
        ["--background-hover" as string]: opacity(accent, 0.1),
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}

export default function Garden() {
  return (
    <Layout>
      <Container>
        <h1 className={styles.title}>Digital Garden 🏡</h1>
        <h2 className={styles.subtitle}>
          Welcome to my digital garden, a personal wiki where I collect notes
          and links.
        </h2>
        <details className={styles.details}>
          <summary>Not sure what this page is? Read this first.</summary>
          <p>
            The way this works is simple. I pick a couple of things I’m going to
            think about, create corresponding Notion pages, and link them here.
            Then, I keep these Notion pages{" "}
            <a href="https://notes.andymatuschak.org/Evergreen_notes">
              evergreen
            </a>{" "}
            by periodically updating them whenever I have ideas or learn
            something about the corresponding topic.
          </p>
          <p>
            Want to learn more?{" "}
            <a href="https://maggieappleton.com/garden-history">Here</a> is an
            intro to digital gardens. My garden in particular is inspired by the
            garden of <a href="https://chasem.co/notes">Chase McCoy</a>.
          </p>
        </details>
        <hr />
        <section className={styles.garden}>
          <p className={styles.description}>Currently thinking about...</p>
          <Patches>
            <Patch
              link="https://www.notion.so/kabirgoel/fb693c34be3b42ce813e8cf8ff84d6f7?v=382cc5989e894a7c825ae694001d54f3"
              accent="#2664a7"
              title="How people think"
              description="Mechanisms of thought on a biological, psychological, and social level."
            />
            <Patch
              link="https://www.notion.so/kabirgoel/fb693c34be3b42ce813e8cf8ff84d6f7?v=5fc36f2c52de489c8866d5c5de15fea0"
              accent="#087720"
              title="Design on the web"
              description="Design and typography on the web, and methods that make life easier."
            />
            <Patch
              link="https://www.notion.so/kabirgoel/fb693c34be3b42ce813e8cf8ff84d6f7?v=fc022ab9d23648f69a3d8eb283b275dc"
              accent="#bb2b4a"
              title="Free speech"
              description="Censorship, the Internet, and the things that make and break it."
            />
          </Patches>
          <p className={styles.description}>Everything else</p>
          <Patches>
            <Patch
              className={styles.playlist}
              accent="#db8906"
              link="https://www.notion.so/kabirgoel/2b3224f21629468580551a14edae4616?v=5a2db9f0bb944564ae019709de328801"
              title="Playlist"
              description="A Notion board with everything I’m reading, listening to, and watching."
            />
            <Patch
              link="https://www.notion.so/kabirgoel/Pixel-Art-594611d3b3f34aa3b2321a23f5734cf1"
              accent="#00a6a6"
              title="Pixel art"
              description="Visual work using just pixels."
            />
          </Patches>
        </section>
      </Container>
    </Layout>
  );
}
