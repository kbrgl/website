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
import Subscribe from "../components/subscribe";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Frontmatter = {
  date: Date;
  slug: string;
  title: string;
  subtitle: string;
  hidden?: string;
  preview?: string;
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
    <div className={styles.email}>
      <span>
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
    </div>
  );
}

function Intro() {
  return (
    <div className={styles.intro}>
      <Me />
      <h1 className={styles.blurb}>
        I’m a sophomore studying CS & math at UC&nbsp;Berkeley.
      </h1>
      <p>
        I design for impact at{" "}
        <a style={{ color: "#3d78bb" }} href="https://calblueprint.org">
          Blueprint
        </a>
        , serve on the Alumni&nbsp;Leader&shy;ship&nbsp;Council of the{" "}
        <a
          style={{ color: "#15489f" }}
          href="https://www.conradchallenge.org/alumni-leadership-council"
        >
          Conrad&nbsp;Foundation
        </a>
        , and write a news&shy;letter descriptively titled{" "}
        <a style={{ color: "#382394" }} href="https://buttondown.email/kabir">
          Kabir&nbsp;Talks&nbsp;About&nbsp;Stuff
        </a>
        .
      </p>
      <Email />
    </div>
  );
}

function Newsletter() {
  return (
    <div>
      <div className={styles.newsletterRow}>
        <p className={styles.text}>
          <strong>Get my writing in your inbox.</strong> No spam, just
          occasional thoughts on design, productivity, programming, and whatever
          else is on my mind.
        </p>
        <img height={48} width={48} src="/newsletter-logo.png" alt="" />
      </div>
      <Subscribe className={styles.subscribe} />
    </div>
  );
}

type PostProps = {
  post: Post;
};
function Post({ post }: PostProps) {
  return (
    <div className={styles.post}>
      <Link href={`/p/${post.slug}`}>
        <a>
          <div className={styles.details}>
            <div className={styles.meta}>
              <span className={styles.title}>{post.title}</span>
              <span className={styles.date}>
                &nbsp;&middot;&nbsp;{post.dateString}
              </span>
            </div>
            <p className={styles.subtitle}>{post.subtitle}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

type WritingProps = {
  posts: Post[];
};
function Writing({ posts }: WritingProps) {
  return (
    <section className={styles.writing}>
      <Newsletter />

      <h2 id="writing">Posts</h2>
      <div className={styles.posts}>
        {posts
          .map((post) => ({
            ...post,
            date: parseDate(post.dateString),
          }))
          .sort((a: Frontmatter, b: Frontmatter) => +b.date - +a.date)
          .map((post: Post) => (
            <Post key={post.slug} post={post} />
          ))}
      </div>
    </section>
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
