module.exports = {
  content: ["./_includes/**/*.pug", "./_includes/**/*.svg", "./*.pug"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "indivisible, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      title:
        "new-spirit-condensed, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      serif:
        "Source Serif Pro, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      mono: "input-mono-condensed, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
