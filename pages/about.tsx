import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <Layout>
      <Container>
        <img className={styles.cover} alt="Me" src="/cover.jpeg" />
        <h1>Hey there, I’m Kabir!</h1>
        <hr />
        <p>
          I’m a freshman at the University of California, Berkeley, where I’m
          studying CS and Cognitive Science—a lethal combo I like to call
          CS-squared. I serve on the Alumni Leadership Council of the{" "}
          <a
            style={{ color: "#15489f", textDecorationColor: "currentColor" }}
            href="https://www.conradchallenge.org/alumni-leadership-council"
          >
            Conrad Foundation
          </a>{" "}
          and write a weekly newsletter called{" "}
          <a
            style={{ color: "#6143a7", textDecorationColor: "currentColor" }}
            href="https://kabirgoel.substack.com"
          >
            Great Stuff
          </a>
          .
        </p>
        <p>
          I grew up in New Delhi, India, where I attended
          Delhi&nbsp;Public&nbsp;School, R.K.&nbsp;Puram. There, I led{" "}
          <a
            style={{ color: "#1866c4", textDecorationColor: "currentColor" }}
            href="https://exunclan.com"
          >
            the technology club
          </a>
          , organized a technology conference attended by 3,000 high schoolers
          from around India, and created{" "}
          <a
            style={{ color: "#0545aa", textDecorationColor: "currentColor" }}
            href="https://unslant.github.io"
          >
            Unslant
          </a>
          . I also won several awards, including the NASA Goddard Award at the
          Conrad Challenge and the Grand Prize at a national hackathon where I
          competed against 30 university teams.
        </p>
        <p>
          Even earlier, I spent my early childhood running around my parents’
          factory in Ambala, a small town a few hours northwest of
          New&nbsp;Delhi. The factory manufactured science lab equipment, so I
          gained a fascination with science and the world that I hold to this
          day.
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
