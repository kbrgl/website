module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "neue-haas-unica",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
      serif: ["DM Serif Display", "Iowan Old Style", "Georgia", "serif"],
      mono: [
        "consolas",
        "menlo",
        "monaco",
        "Andale Mono WT",
        "Andale Mono",
        "Lucida Console",
        "Lucida Sans Typewriter",
        "DejaVu Sans Mono",
        "Bitstream Vera Sans Mono",
        "Liberation Mono",
        "Nimbus Mono L",
        "Courier New",
        "courier",
        "monospace",
      ],
    },
    extend: {
      colors: {
        accent: "#516e90",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};