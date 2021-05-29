import { useState } from "react";
import SingleFieldForm from "./single-field-form";
import StatusMessage from "./status-message";
import styles from "./subscribe.module.css";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  const handleSubmit = async (email) => {
    setLoading(true);

    let json;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      json = await res.json();
    } catch (err) {
      setOk(false);
    }

    setOk(json.ok);
    setLoading(false);
  };

  return (
    <div className={`${styles.subscribe} ${loading ? styles.loading : ""}`}>
      <SingleFieldForm
        type="email"
        placeholder="Your email..."
        onSubmit={handleSubmit}
        className={styles.form}
        action="Sign up"
      />
      {ok !== null ? (
        <StatusMessage
          ok={ok}
          message={
            ok
              ? "Thanks for signing up! Please check your inbox."
              : "Couldn’t sign you up. Are you sure your email is valid and you aren’t already subscribed?"
          }
          className={styles.message}
        />
      ) : null}
    </div>
  );
}
