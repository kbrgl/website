import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <Layout>
      <Container>
        <p className={styles.intro}>
          <strong>Hi, I’m Kabir.</strong> I’m a sophomore at UC Berkeley, where
          I’m studying CS and Cognitive Science. I serve on the Alumni
          Leadership Council of the{" "}
          <a href="https://www.conradchallenge.org/alumni-leadership-council">
            Conrad&nbsp;Foundation
          </a>{" "}
          and write a weekly newsletter called{" "}
          <a href="https://buttondown.email/kabir">
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
          I grew up in New Delhi, India, where I attended
          Delhi&nbsp;Public&nbsp;School, R.K.&nbsp;Puram. There, I led{" "}
          <a href="https://exunclan.com">the technology club</a>, organized a{" "}
          <a href="http://web.archive.org/web/20200804002729if_/https://exunclan.com/">
            technology conference
          </a>{" "}
          attended by 3,000 high schoolers from around India, and created{" "}
          <a href="https://unslant.github.io">Unslant</a>. I also won several
          awards, including the NASA Goddard Award at the Conrad Challenge and
          the Grand Prize at a national hackathon where I competed against 30
          university teams.
        </p>
        <p>
          Even earlier, I spent my early childhood running around my parents’
          factory in Ambala, a small town a few hours northwest of
          New&nbsp;Delhi.
        </p>
        <p>
          At some point in the future, I want to either start my own company or
          get a PhD at the confluence of CS and cognitive science. Right now,
          I’m trying to figure out how to get there. Over the next few years, I
          want to explore programming languages, human-computer interaction,
          brain-machine interfaces, AI, and disinformation. Shoot me an email if
          you’d like to collaborate on something!
        </p>
      </Container>
    </Layout>
  );
}
