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
      className="flex flex-col md:flex-row items-stretch space-y-2 md:space-y-0 md:space-x-2"
    >
      <input
        className="p-3 text-sm flex-1 border focus:border-accent outline-none h-12 rounded-none"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="bg-accent text-white h-12 w-36 font-bold text-sm border border-[#405064]"
        type="submit"
      >
        {action}
      </button>
    </form>
  );
}
