import NowPlaying from "../components/now-playing";
import TopTracks from "../components/top-tracks";
import Layout from "../components/layout";
import Container from "../components/container";
import Title from "../components/title";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Spotify() {
  return (
    <Layout>
      <Header />
      <Container>
        <div className="pt-10" />
        <Title>Listening Habits</Title>
        <p className="text-gray-500 pt-5 pb-10">
          Pulled live from{" "}
          <a href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw">
            my Spotify account
          </a>
          .
        </p>
        <NowPlaying />
        <h2 className="text-3xl font-serif pt-12 pb-5">Most Played</h2>
        <TopTracks />
        <div className="pt-10" />
        <Footer />
      </Container>
    </Layout>
  );
}
