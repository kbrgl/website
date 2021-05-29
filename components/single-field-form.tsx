import { useState } from "react";
import styles from "./single-field-form.module.css";

export default function SingleFieldForm({
  action = "Submit",
  type = "text",
  onSubmit = (value) => value,
  placeholder = "",
  className = "",
}) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
      className={`${styles.form} ${className}`}
    >
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type={type}
        placeholder={placeholder}
      />
      <button type="submit">{action}</button>
    </form>
  );
}
