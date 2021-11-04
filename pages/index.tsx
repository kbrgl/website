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
      <h1 className={styles.blurb}>
        I’m a sophomore studying CS&nbsp;
        <span>
          <svg
            height="0.75em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 19"
            fill="currentColor"
          >
            <path d="M1.3 18.85c-.381 0-.693-.121-.936-.364S0 17.931 0 17.55V1.3C0 .901.121.589.364.364.607.121.919 0 1.3 0h29.12c.399 0 .711.121.936.364.243.225.364.537.364.936v16.25c0 .381-.121.693-.364.936-.225.243-.537.364-.936.364H1.3zm.91-17.42a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H2.21zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H6.89zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H11.57zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H16.25zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H20.93zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h3.484a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V1.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H25.61zM3.25 5.72a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H3.25zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H7.93zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H12.61zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H17.29zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H21.97zm5.2 6.864a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.404a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V6.24a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H26.65a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156.5.5 0 0 1 .364.156.5.5 0 0 1 .156.364v3.38zM4.29 10.14a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V10.66a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H4.29zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V10.66a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H8.97zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V10.66a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H13.65zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V10.66a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H18.33zm4.68 0a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h1.924a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V10.66a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H23.01zM7.93 14.43a.5.5 0 0 0-.364.156.5.5 0 0 0-.156.364v1.924a.5.5 0 0 0 .156.364.5.5 0 0 0 .364.156h15.964a.5.5 0 0 0 .364-.156.5.5 0 0 0 .156-.364V14.95a.5.5 0 0 0-.156-.364.5.5 0 0 0-.364-.156H7.93z" />
          </svg>
        </span>{" "}
        and design&nbsp;
        <span>
          <svg
            style={{ verticalAlign: -1 }}
            height="0.75em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 18 20"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              d="M9.052 9.496c.626.381 1.498.643 2.615.787l2.044.305c.88.22 1.536.546 1.968.978s.648.982.648 1.65c0 .102-.009.22-.025.356-.017.127-.042.258-.076.393-.305.262-.605.457-.901.584a2.18 2.18 0 0 1-.889.191 2.44 2.44 0 0 1-1.143-.292c-.364-.195-.779-.525-1.244-.99-.136-.144-.546-.656-1.232-1.536s-1.371-1.523-2.057-1.93l-.305-.19v.368c0 .711.237 1.659.711 2.844l.089.241.66 1.828c.102.381.152.728.152 1.041 0 .618-.157 1.13-.47 1.536-.305.406-.783.728-1.435.965-.652-.237-1.13-.559-1.435-.965s-.457-.918-.457-1.536c0-.542.233-1.405.698-2.59l.102-.267c.339-.812.559-1.43.66-1.854a5.43 5.43 0 0 0 .152-1.244v-.368l-.317.19c-.643.389-1.312 1.028-2.006 1.917l-1.27 1.561c-.449.449-.863.774-1.244.978a2.44 2.44 0 0 1-1.143.292 2.33 2.33 0 0 1-.927-.191c-.288-.127-.58-.326-.876-.597a3.17 3.17 0 0 1-.076-.368A2.6 2.6 0 0 1 0 13.216c0-.66.216-1.202.647-1.625.432-.432 1.092-.766 1.98-1.003.237-.068.914-.169 2.031-.305 1.117-.144 1.993-.406 2.628-.787l.305-.19-.305-.178c-.643-.364-1.519-.618-2.628-.762l-2.031-.33c-.889-.237-1.549-.567-1.98-.99C.216 6.614 0 6.068 0 5.408a2.6 2.6 0 0 1 .025-.368c.017-.118.047-.25.089-.394.305-.262.601-.457.889-.584a2.27 2.27 0 0 1 .901-.19c.381 0 .757.102 1.13.305.381.203.8.537 1.257 1.003.169.169.597.698 1.282 1.587.694.88 1.358 1.502 1.993 1.866l.317.178v-.355a5.27 5.27 0 0 0-.152-1.231c-.102-.432-.317-1.049-.647-1.854l-.114-.279c-.466-1.185-.698-2.048-.698-2.59 0-.626.152-1.138.457-1.536C7.033.559 7.511.237 8.163 0c.652.237 1.13.559 1.435.965.313.398.47.91.47 1.536 0 .542-.233 1.401-.698 2.577l-.114.292-.076.19c-.482 1.219-.724 2.184-.724 2.895v.355l.305-.178c.652-.381 1.316-1.011 1.993-1.892l1.295-1.587c.44-.449.851-.774 1.231-.978s.766-.305 1.155-.305a2.18 2.18 0 0 1 .889.19c.296.127.597.326.901.597.034.135.059.267.076.394s.025.245.025.355c0 .652-.216 1.193-.648 1.625s-1.096.766-1.993 1.003c-.245.068-.922.178-2.031.33-1.109.144-1.976.398-2.603.762l-.317.178.317.19z"
            />
          </svg>
        </span>{" "}
        at UC&nbsp;Berkeley.
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
      <p>
        You can email me at &nbsp;
        <Email /> or find me on{" "}
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
        <strong>Get my writing in your inbox.</strong> No spam, just occasional
        thoughts on design, productivity, programming, and whatever else is on
        my mind.
      </p>
    </ImageCard>
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
