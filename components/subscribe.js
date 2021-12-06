import { useState } from "react";
import SingleFieldForm from "./single-field-form";
import StatusMessage from "./status-message";

function Loader() {
  return (
    <div className="w-full flex items-center justify-center">
      <span>Signing up</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 ml-1 animate-spin opacity-80"
      >
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    </div>
  );
}

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
    <div>
      <hr />
      <div className="py-10">
        <p className="font-medium text-sm">Get my writing in your inbox</p>
        <div className="mt-1 mb-2">
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
        <p className="text-gray-500 text-sm max-w-prose">
          No spam, just occasional thoughts on design, productivity,
          programming, and whatever else is on my mind.
        </p>
      </div>
    </div>
  );
}
