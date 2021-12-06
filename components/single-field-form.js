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
      className="flex items-stretch space-x-2"
    >
      <input
        className="p-3 text-sm flex-1 border focus:border-accent outline-none h-12"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="bg-accent text-white w-36 font-bold text-sm border border-[#405064]"
        type="submit"
      >
        {action}
      </button>
    </form>
  );
}
