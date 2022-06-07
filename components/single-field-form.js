import { useState } from "react";

export default function SingleFieldForm({
  action = "Submit",
  type = "text",
  onSubmit = (value) => value,
  placeholder = "",
}) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
      className="flex flex-col space-y-2"
    >
      <input
        className="p-3 flex-1 bg-gray-100 outline-none h-12 rounded-lg transition-colors"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="bg-cyan-500 text-white h-10 w-24 font-bold text-sm border border-cyan-600 rounded-lg"
        type="submit"
      >
        {action}
      </button>
    </form>
  );
}
