import { useState } from "react";
import SingleFieldForm from "./single-field-form";
import StatusMessage from "./status-message";
import Loader from "./loader";

export default function Subscribe({ minimal = false }) {
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
    <div className="border p-12 rounded-xl">
      {!minimal && (
        <p className="leading-snug font-medium mb-2">
          Get more like this in your inbox.
        </p>
      )}
      <SingleFieldForm
        action={loading ? <Loader /> : "Sign up"}
        type="email"
        placeholder="Your email..."
        onSubmit={handleSubmit}
      />
      {ok !== null ? (
        <StatusMessage
          ok={ok}
          message={
            ok
              ? "Thanks for signing up! Please check your inbox."
              : "Couldn’t sign you up. Are you sure your email is valid and you aren’t already subscribed?"
          }
          className="mt-3"
        />
      ) : null}
    </div>
  );
}
