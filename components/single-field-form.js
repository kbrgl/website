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
        className="px-3 py-2 max-w-sm flex-1 bg-gray-100 outline-none rounded-lg transition-colors"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="text-black h-9 w-20 font-medium text-sm border border-gray-200 rounded-lg"
        type="submit"
      >
        {action}
      </button>
    </form>
  );
}
