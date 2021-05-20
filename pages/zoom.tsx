import { useState } from "react";
import Container from "../components/container";
import Layout from "../components/layout";

import styles from "../styles/Zoom.module.css";

export default function Zoom() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="Enter the magic word..."
            />
            <button type="submit">Join Room</button>
          </form>
          {message !== "" ? <p className={styles.message}>{message}</p> : null}
        </div>
      </Container>
    </Layout>
  );
}
