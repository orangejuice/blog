const settings = require(`./settings`)

require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteTitle: `Orangejuice`,
    siteTitleAlt: `Minimal Blog`,
    siteHeadline: `Minimal Blog - Gatsby Theme from @lekoarts`,
    siteUrl: `https://minimal-blog.lekoarts.de`,
    siteDescription: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and line highlighting.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@lekoarts_de`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: settings.postsPath,
        path: settings.postsPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: settings.pagesPath,
        path: settings.pagesPath,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /static/
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Orangejuice`,
        short_name: `Orangejuice`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `./static/favicon@2x.png`
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: require(`./src/utils/feed`)(settings.feedTitle),
    },
    {
      resolve: "gatsby-plugin-ackee-tracker",
      options: {
        domainId: '86d43cea-bf09-4649-9d45-0ed26b6ea2f2',
        server: 'https://analytics.orice.me',
        ignoreLocalhost: true,
        detailed: true
      },
    },
  ],
}
