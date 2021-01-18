import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/Home.module.css";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Frontmatter = {
  date: Date;
  slug: string;
  title: string;
  subtitle: string;
};

type Post = Omit<Frontmatter, "date"> & { dateString: string };

function Email() {
  return (
    <span className={styles.email}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={styles.icon}
        onClick={() => {
          navigator.clipboard.writeText("kabirgoel.kg@gmail.com");
        }}
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <a href="mailto:kabirgoel.kg@gmail.com">kabirgoel.kg@gmail.com</a>
    </span>
  );
}

function Intro() {
  return (
    <div>
      <div className={styles.picture}>
        <Image
          className={styles.me}
          layout="fixed"
          height={120}
          width={120}
          priority
          quality={100}
          src="/me.png"
          alt="Me"
        />
      </div>
      <p>
        Hi, I’m Kabir! I’m studying <span className={styles.cs}>CS</span> and{" "}
        <span className={styles.cogSci}>Cognitive Science</span> at UC Berkeley,
        serving on the Alumni Leadership Council of the{" "}
        <a
          style={{ color: "#15489f", textDecorationColor: "currentColor" }}
          href="https://www.conradchallenge.org/alumni-leadership-council"
        >
          Conrad&nbsp;Foundation
        </a>
        , and writing a weekly newsletter called{" "}
        <a
          style={{ color: "#6143a7", textDecorationColor: "currentColor" }}
          href="https://kabirgoel.substack.com"
        >
          Great Stuff
        </a>
        .
      </p>
      <p>
        You can email me at <Email /> or follow me on{" "}
        <a
          style={{ color: "#146ba1", textDecorationColor: "currentColor" }}
          href="https://twitter.com/KabirGoel"
        >
          Twitter
        </a>
        ,{" "}
        <a
          style={{ color: "#118339", textDecorationColor: "currentColor" }}
          href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw"
        >
          Spotify
        </a>
        , or{" "}
        <a
          style={{ color: "#033175", textDecorationColor: "currentColor" }}
          href="https://github.com/kbrgl"
        >
          GitHub
        </a>
        !
      </p>
      <p className={styles.light}>
        I’m looking for summer internships for 2021. If you have an opportunity,
        shoot me an email!
      </p>
    </div>
  );
}

function Newsletter() {
  return (
    <div className={styles.card}>
      <div
        className={styles.background}
        style={{ backgroundImage: "url(/great-stuff-wordmark.png)" }}
      />
      <div className={styles.logo}>
        <Image
          layout="fill"
          src="/great-stuff-logo.png"
          alt="Newsletter logo"
        />
      </div>
      <p className={styles.text}>
        You’ll find most of my writing on my newsletter, Great&nbsp;Stuff, where
        I talk about human interactions, design, and productivity.{" "}
        <a href="https://kabirgoel.substack.com">Subscribe&nbsp;&rarr;</a>
      </p>
    </div>
  );
}

type PostProps = {
  post: Post;
};
function Post({ post }: PostProps) {
  return (
    <li className={styles.post}>
      <Link href={`/p/${post.slug}`}>
        <a>
          <div className={styles.meta}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.date}>
              &nbsp;&middot;&nbsp;{post.dateString}
            </span>
          </div>
          <p className={styles.subtitle}>{post.subtitle}</p>
        </a>
      </Link>
    </li>
  );
}

type WritingProps = {
  posts: Post[];
};
function Writing({ posts }: WritingProps) {
  return (
    <div>
      <h2 id="writing">Writing</h2>
      <Newsletter />
      <ul className={styles.posts}>
        {posts
          .map((post) => ({
            ...post,
            date: parseDate(post.dateString),
          }))
          .sort((a: Frontmatter, b: Frontmatter) => +b.date - +a.date)
          .map((post: Post) => (
            <Post key={post.slug} post={post} />
          ))}
      </ul>
    </div>
  );
}

type HomeProps = WritingProps;
export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Container>
        <Intro />
        <Writing posts={posts} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDirectory);

  const posts = (
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
    dateString: formatDate(date),
  }));

  return {
    props: {
      posts,
    },
  };
}
