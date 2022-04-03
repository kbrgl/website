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
    <div>
      {!minimal && (
        <>
          <hr className="w-24 pb-8 md:pb-5" />
          <div className="flex space-x-3 mb-5 items-end -mt-3">
            <p className="leading-snug">
              <span className="font-medium">Get my posts in your inbox.</span>{" "}
              <span className="text-gray-500">
                No spam, just occasional thoughts on design, productivity,
                programming, and whatever else is on my mind.
              </span>
            </p>
            <img
              className="h-16 w-16 rounded-lg shadow-md rotate-3 -skew-x-3"
              src="/newsletter-logo.png"
              alt=""
            />
          </div>
        </>
      )}
      <div className="mb-3">
        <SingleFieldForm
          action={loading ? <Loader /> : "Sign up"}
          type="email"
          placeholder="Your email..."
          onSubmit={handleSubmit}
        />
      </div>
      {ok !== null ? (
        <StatusMessage
          ok={ok}
          message={
            ok
              ? "Thanks for signing up! Please check your inbox."
              : "Couldn’t sign you up. Are you sure your email is valid and you aren’t already subscribed?"
          }
          className="my-1"
        />
      ) : null}
    </div>
  );
}
