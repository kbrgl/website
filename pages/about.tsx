import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <Layout>
      <Container>
        <h1 className={styles.intro}>
          Kabir is a sophomore studying CS and Cognitive Science at
          UC&nbsp;Berkeley.
        </h1>
        <p>
          In his free time, he serves on the
          Alumni&nbsp;Leader&shy;ship&nbsp;Council of the{" "}
          <a
            style={{ color: "#15489f" }}
            href="https://www.conradchallenge.org/alumni-leadership-council"
          >
            Conrad&nbsp;Foundation
          </a>{" "}
          and writes a news&shy;letter descriptively called{" "}
          <a style={{ color: "#382394" }} href="https://buttondown.email/kabir">
            Kabir&nbsp;Talks&nbsp;About&nbsp;Stuff
          </a>
          .
        </p>
        <img
          height="756"
          width="1008"
          className={styles.cover}
          alt="Me"
          src="/cover.jpeg"
        />
        <p>
          He grew up in New Delhi, India, where he attended
          Delhi&nbsp;Public&nbsp;School, R.K.&nbsp;Puram. There, he led{" "}
          <a href="https://exunclan.com">the technology club</a>, organized a{" "}
          <a href="http://web.archive.org/web/20200804002729if_/https://exunclan.com/">
            technology conference
          </a>{" "}
          attended by 3,000 high schoolers from around India, and created{" "}
          <a href="https://unslant.github.io">Unslant</a>. He also won several
          awards, including the NASA Goddard Award at the Conrad Challenge and
          the Grand Prize at a national hackathon where he competed against 30
          university teams.
        </p>
        <p>
          Even earlier, he spent his early childhood running around his parents’
          factory in Ambala, a small town a few hours northwest of
          New&nbsp;Delhi.
        </p>
        <p>
          At some point in the future, he wants to either start his own company
          or get a PhD at the confluence of CS and cognitive science. Right now,
          he’s trying to figure out how to get there. Over the next few years,
          he wants to explore programming languages, human-computer interaction,
          brain-machine interfaces, AI, and disinformation. Shoot him an email
          if you’d like to collaborate on something!
        </p>
      </Container>
    </Layout>
  );
}
