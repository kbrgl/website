module.exports = {
  content: ["./_includes/**/*.pug", "./*.pug"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "indivisible, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      title:
        "sculpin, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      serif:
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      mono: "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
    },
    extend: {
      colors: {
        primary: "#22f",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
