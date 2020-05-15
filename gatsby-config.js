require(`dotenv`).config({
  path: `.env`,
})

const options = {
  postsPath: `content/posts`,
  pagesPath: `content/pages`,
  navigation: [
    {
      title: `Blog`,
      slug: `/blog`,
    },
    {
      title: `About`,
      slug: `/about`,
    },
  ],
  externalLinks: [
    {
      name: `Twitter`,
      url: `https://twitter.com/lekoarts_de`,
    },
    {
      name: `Instagram`,
      url: `https://www.instagram.com/lekoarts.de/`,
    },
  ],
}

const { mdx = true } = options
const newsletterFeed = require(`./src/utils/newsletterFeed`)

const { feed = true, feedTitle = `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog` } = options


module.exports = {
  siteMetadata: {
    siteTitle: `Lupin`,
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
      resolve: `theme-core`,
      options,
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.postsPath,
        path: options.postsPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.pagesPath,
        path: options.pagesPath,
      },
    },
    mdx && {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
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
        plugins: [
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
    feed && {
      resolve: `gatsby-plugin-feed`,
      options: newsletterFeed(feedTitle),
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-theme-ui`,
  ],
}
