import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

export function ErrorIcon() {
  return <ExclamationCircleIcon className="w-4 h-4 inline-block pb-0.5" />;
}

export function SuccessIcon() {
  return <CheckCircleIcon className="w-4 h-4 inline-block pb-0.5" />;
}

export default function StatusMessage({ ok, message, className = "" }) {
  return (
    <div
      className={`text-sm max-w-sm ${
        ok ? "text-green-600" : "text-red-700"
      } ${className}`}
    >
      {ok ? <SuccessIcon /> : <ErrorIcon />} {message}
    </div>
  );
}
