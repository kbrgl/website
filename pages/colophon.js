import Container from "../components/container";
import Layout from "../components/layout";
import Header from "../components/header";
import Title from "../components/title";

export default function Colophon() {
  return (
    <Layout>
      <Header />
      <Container>
        <div className="pb-10">
          <Title className="py-12">Colophon</Title>
          <p className="text-gray-500">
            Set in Neue Haas Unica, Dashiell Fine, and Dashiell Text. Inspired
            by many other personal websites, some of which you can find on{" "}
            <a
              className="link"
              href="https://kabirgoel.notion.site/8217326f3ca5430c859e78b1ca73dceb?v=e2759efdec7e4f938fca7edca4fde2ac"
            >
              this Notion board
            </a>
            .
          </p>
          <p className="mt-3 text-gray-500">
            Built on Next.js and deployed on Vercel.
          </p>
        </div>
      </Container>
    </Layout>
  );
}
