const options = require('../../settings')
const i18n = require('./i18n')

const channels = () => {
  const array = []
  Object.keys(i18n).forEach((locale) => {
    const path = locale === i18n.defaultLocale ? '' : `/${locale}`
    array.push({
      serialize: ({query: {allPost}}) => {
        return allPost.nodes.map((post) => {
          return {
            title: post.title,
            date: post.date,
            description: post.excerpt,
            url: options.siteUrl + post.slug,
            guid: options.siteUrl + post.slug,
            custom_elements: [{"content:encoded": post.html}],
          }
        })
      },
      query: `
        {
          allPost(
            locale: ${locale},
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
      output: `${path}/rss.xml`,
      title: i18n.locales[locale].siteTitle,
      description: i18n.locales[locale].siteDescription,
    })
  })
  return array
}

module.exports = () => ({
  feeds: channels(),
})
