// eslint-disable-next-line import/no-unresolved
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/Home.module.css";

function Newsletter() {
  return (
    <div className={styles.card}>
      <div style={{ backgroundImage: "url(/great-stuff-wordmark.png)" }} />
      <img src="/great-stuff-logo.png" alt="Newsletter logo" />
      <p>
        You’ll find most of my writing on my newsletter, Great&nbsp;Stuff, where
        I share insights from what I’m reading, listening to, and watching.{" "}
        <a href="https://kabirgoel.substack.com">Subscribe now!</a>
      </p>
    </div>
  );
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Frontmatter = {
  date: Date;
  slug: string;
  title: string;
  subtitle: string;
};

type HomeProps = {
  notes: Array<Omit<Frontmatter, "date"> & { dateString: string }>;
};

export default function Home({ notes }: HomeProps) {
  return (
    <Layout>
      <Container>
        <div className={styles.picture}>
          <img src="/me.png" alt="Me" />
        </div>
        <p>
          Hi, I’m Kabir! I’m studying <span className={styles.cs}>CS</span> and{" "}
          <span className={styles.cogSci}>Cognitive Science</span> at UC
          Berkeley, serving on the Alumni Leadership Council of the{" "}
          <a
            style={{ color: "#15489f", textDecorationColor: "currentColor" }}
            href="https://www.conradchallenge.org/alumni-leadership-council"
          >
            Conrad&nbsp;Foundation
          </a>{" "}
          as an Observer, and collaborating on research projects in healthcare
          and disinformation. Follow me on{" "}
          <a
            style={{ color: "#146ba1", textDecorationColor: "currentColor" }}
            href="https://twitter.com/KabirGoel"
          >
            Twitter
          </a>{" "}
          or{" "}
          <a
            style={{ color: "#118339", textDecorationColor: "currentColor" }}
            href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw"
          >
            Spotify
          </a>
          !
        </p>
        <p className={styles.light}>
          I’m looking for summer internships for 2021. If you have an
          opportunity, shoot me an email!
        </p>
        <h2>Writing</h2>
        <Newsletter />
        <ul className={styles.list}>
          {notes
            .map((note) => ({
              ...note,
              date: new Date(note.dateString),
            }))
            .sort((a: Frontmatter, b: Frontmatter) => +b.date - +a.date)
            .map((note: Frontmatter) => (
              <li key={note.title}>
                <Link href={`/p/${note.slug}`}>
                  <a>
                    <div className={styles.meta}>
                      <span className={styles.title}>{note.title}</span>
                      <span className={styles.date}>
                        {formatDate(note.date)}
                      </span>
                    </div>
                    <p className={styles.subtitle}>{note.subtitle}</p>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <hr />
        <p className={styles.light}>
          “Man who make mistake in elevator is wrong on many levels.”—Confucius
        </p>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "content", "notes");
  const filenames = await fs.readdir(postsDirectory);

  const notes = (
    await Promise.all(
      filenames.map(
        async (filename): Promise<Frontmatter> => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, "utf8");
          const frontmatter = matter(fileContents).data as Frontmatter;

          return {
            ...frontmatter,
            slug: path.basename(filename, path.extname(filename)),
          };
        }
      )
    )
  ).map(({ date, ...data }) => ({
    ...data,
    dateString: String(date),
  }));

  return {
    props: {
      notes,
    },
  };
}
