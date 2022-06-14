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
      className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2"
    >
      <input
        className="px-3 py-2 border-2 focus:border-gray-700 flex-1 outline-none rounded-lg transition-all shadow-sm"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="bg-cyan-500 text-white py-2 px-6 font-medium text-sm border border-cyan-600 rounded-lg shadow-sm"
        type="submit"
      >
        {action}
      </button>
    </form>
  );
}
