const options = require('../../settings')
const i18n = require('./i18n')

const channels = () => {
  const array = []
  Object.keys(i18n.locales).forEach((locale) => {
    const path = locale === i18n.defaultLocale ? "/" : `/${locale}/`
    array.push({
      serialize: ({query: {allPost}}) => {
        return allPost.nodes.map((post) => {
          return {
            title: post.title,
            date: post.date,
            description: post.excerpt,
            url: options.siteUrl + `${path}/${post.slug}`.replace(/\/\/+/g, `/`),
            guid: options.siteUrl + `${path}/${post.slug}`.replace(/\/\/+/g, `/`),
            custom_elements: [{"content:encoded": post.html}],
          }
        })
      },
      query: `
        {
          allPost(
            filter: { locale: {eq: "${locale}"} },
            sort: { fields: date, order: DESC }, 
            limit: 100
          ) {
            nodes {
              title
              date
              excerpt
              slug
              html
            }
          }
        }`,
      output: `${path}/rss.xml`.replace(/\/\/+/g, `/`),
      title: i18n.locales[locale].siteTitle,
      description: i18n.locales[locale].siteDescription,
      site_url: `${options.siteUrl}${path}`,
    })
  })
  return array
}

module.exports = () => ({
  query: `{ site { id } }`,
  feeds: channels()
})
