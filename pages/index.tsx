import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import NowPlaying from "../components/now-playing";
import formatDate from "../utils/format-date";
import parseDate from "../utils/parse-date";
import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/Home.module.css";
import Me from "../components/me";
import ImageCard from "../components/image-card";
import Subscribe from "../components/subscribe";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Frontmatter = {
  date: Date;
  slug: string;
  title: string;
  subtitle: string;
  hidden?: string;
};

type Post = Omit<Frontmatter, "date"> & { dateString: string };

function Email() {
  const TEXT_TO_COPY = "kabirgoel.kg@gmail.com";

  const copy = () => {
    const textArea = document.createElement("textarea") as HTMLTextAreaElement;
    textArea.readOnly = true;
    textArea.contentEditable = "true";
    textArea.value = TEXT_TO_COPY;
    document.body.appendChild(textArea);

    let range;
    let selection;

    if (navigator.userAgent.match(/ipad|iphone/i)) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <span className={styles.email}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={styles.icon}
        onClick={copy}
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
    <div className={styles.intro}>
      <Me />
      <p>
        <strong>Hi, I’m Kabir!</strong> I’m studying computing and cognition at
        Berkeley, serving on the Alumni Leader&shy;ship Council of the{" "}
        <a
          style={{ color: "#15489f" }}
          href="https://www.conradchallenge.org/alumni-leadership-council"
        >
          Conrad Foundation
        </a>
        , and writing my news&shy;letter,{" "}
        <a style={{ color: "#382394" }} href="https://buttondown.email/kabir">
          Kabir Talks About Stuff
        </a>
        .
      </p>
      <p>
        You can email me at &nbsp;
        <Email /> or follow me on{" "}
        <a style={{ color: "#146ba1" }} href="https://twitter.com/KabirGoel">
          Twitter
        </a>
        ,{" "}
        <a
          style={{ color: "#118339" }}
          href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw"
        >
          Spotify
        </a>
        , or{" "}
        <a style={{ color: "#033175" }} href="https://github.com/kbrgl">
          GitHub
        </a>
        .
      </p>
    </div>
  );
}

function Newsletter() {
  return (
    <ImageCard
      className={styles.newsletter}
      src="/newsletter-logo.png"
      alt="Logo"
      height={108}
      width={108}
      plain
      footer={<Subscribe className={styles.subscribe} />}
    >
      <p className={styles.text}>
        <strong>Get my writing in your inbox.</strong> I write about the little
        things that fascinate me, from human interactions, design, and
        productivity to programming, cognitive science, and life in general.
      </p>
    </ImageCard>
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
      <h2 id="writing">Posts</h2>
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

function Music() {
  return (
    <div className={styles.music}>
      <NowPlaying />
      <p className={styles.seeMore}>
        See what I’ve been <Link href="/spotify">listening to &rarr;</Link>
      </p>
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
        <Music />
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
