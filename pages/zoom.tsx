import { useState } from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import StatusMessage from "../components/status-message";
import SingleFieldForm from "../components/single-field-form";

import styles from "../styles/Zoom.module.css";

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
      <Container>
        <div className={styles.wrapper}>
          <h2>Kabir’s Zoom Room</h2>
          <SingleFieldForm
            onSubmit={handleSubmit}
            className={styles.form}
            type="password"
            placeholder="Enter the magic word..."
            action="Join Room"
          />
          {message !== "" ? (
            <StatusMessage
              className={styles.message}
              ok={false}
              message={message}
            />
          ) : null}
        </div>
      </Container>
    </Layout>
  );
}
