import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
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
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;
