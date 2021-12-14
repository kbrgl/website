import { useState } from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import StatusMessage from "../components/status-message";
import SingleFieldForm from "../components/single-field-form";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Zoom() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (password) => {
    let json;
    try {
      const res = await fetch("/api/zoom", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      json = await res.json();
    } catch (err) {
      setMessage("Failed to fetch Zoom link.");
    }

    if (json.ok) {
      window.location = json.link;
    } else {
      setMessage("Wrong password. Please try again.");
    }
  };

  return (
    <Layout>
      <Header />
      <Container>
        <div className="py-10">
          <img className="mb-3 rounded-lg shadow-md" src="/zoom.jpg" alt="" />
          <div className="pt-5" />
          <SingleFieldForm
            onSubmit={handleSubmit}
            type="password"
            placeholder="Enter the magic word..."
            action="Join Room"
          />
          {message !== "" ? (
            <StatusMessage className="mt-2" ok={false} message={message} />
          ) : null}
        </div>
        <Footer />
      </Container>
    </Layout>
  );
}
