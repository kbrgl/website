module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
        ignore: ['**/.*'], // ignore files starting with a dot
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
        ignore: ['**/.*'], // ignore files starting with a dot
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-remark-reading-time',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kabir Goel',
        short_name: 'Kabir Goel',
        start_url: '/',
        background_color: '#bb27ad',
        theme_color: '#bb27ad',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-build-date',
      options: {
        formatAsDateString: true,
        formatting: {
          format: 'MMM D, YYYY', // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: true,
        },
      },
    },
  ],
}
