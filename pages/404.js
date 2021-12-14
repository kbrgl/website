import { useState, useEffect } from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Header from "../components/header";
import Title from "../components/title";

export default function NotFound() {
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    setImgSrc(`https://cataas.com/c/fail?${Date.now()}`);
  }, []);
  return (
    <Layout>
      <Header />
      <Container>
        <div className="py-10">
          <Title>Uh-oh!</Title>
          <p className="mt-5 text-gray-500">
            That page wasn’t found. It may have been deleted or moved.
          </p>
          <img className="mt-8 w-full" src={imgSrc} alt="" />
        </div>
        <Footer />
      </Container>
    </Layout>
  );
}
