import NowPlaying from "../components/now-playing";
import TopTracks from "../components/top-tracks";
import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/Spotify.module.css";

export default function Spotify() {
  return (
    <Layout>
      <Container>
        <h1 className={styles.heading}>Listening Habits</h1>
        <p className={styles.description}>
          Pulled live from{" "}
          <a href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw">
            my Spotify account
          </a>
          .
        </p>
        <NowPlaying />
        <h2>Most Played</h2>
        <TopTracks />
      </Container>
    </Layout>
  );
}
