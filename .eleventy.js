require("dotenv").config()
const { DateTime } = require("luxon")
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")
const { EleventyRenderPlugin } = require("@11ty/eleventy")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const _ = require("lodash")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPassthroughCopy({
    public: "./",
  })

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  })

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("p/*.md")
      .filter((post) => !post.data.hidden)
  })

  eleventyConfig.addCollection("postsByYear", (collectionApi) => {
    return _.chain(collectionApi.getFilteredByGlob("p/*.md"))
      .filter((post) => !post.data.hidden)
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .value()
  })

  const options = {
    html: true,
    typographer: true,
  }
  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItFootnote))

  global.filters = eleventyConfig.javascriptFunctions
  eleventyConfig.setPugOptions({ globals: ["filters"] })

  return {
    markdownTemplateEngine: false,
  }
}
