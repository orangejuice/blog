const i18n = require("./src/utils/i18n")
const kebabCase = require(`lodash.kebabcase`)
const path = require(`path`)
const settings = require(`./settings`)

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({actions, schema}, themeOptions) => {
  const {createTypes, createFieldExtension} = actions

  const {basePath} = settings

  createFieldExtension({
    name: `slugify`,
    extend() {
      return {
        resolve: (source) => {
          const slug = source.slug ? source.slug : kebabCase(source.title)
          return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`)
        },
      }
    },
  })

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({fieldName}) {
      return {
        resolve: async (source, args, context, info) => {
          const type = info.schema.getType(`Mdx`)
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          })
          const resolver = type.getFields()[fieldName].resolve
          const result = await resolver(mdxNode, args, context, {
            fieldName,
          })
          return result
        },
      }
    },
  })

  createTypes(`
    interface Post @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      locale: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160, truncate: Boolean = true): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
    }

    type PostTag {
      name: String
      slug: String
    }

    interface Page @nodeInterface {
      id: ID!
      slug: String!
      title: String!
      locale: String!
      excerpt(pruneLength: Int = 160, truncate: Boolean = true): String!
      body: String!
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify
      title: String!
      locale: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140, truncate: Boolean = true): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
    }

    type MdxPage implements Node & Page {
      slug: String!
      title: String!
      locale: String!
      excerpt(pruneLength: Int = 140, truncate: Boolean = true): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
    }
  `)
}

exports.onCreateNode = ({node, actions, getNode, createNodeId, createContentDigest}) => {
  const {createNode, createParentChildLink} = actions

  const {postsPath, pagesPath} = settings

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `Mdx` && source === postsPath) {
    let modifiedTags

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const name = path.basename(node.fileAbsolutePath, `.mdx`)
    const lang = name === `index` ? i18n.defaultLocale : name.split(`.`)[1]

    const fieldData = {
      slug: fileNode.relativeDirectory,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      locale: lang,
    }

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPostId,
      parent: node.id,
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })

    createParentChildLink({parent: node, child: getNode(mdxPostId)})
  }

  // Check for "pages" and create the "Page" type
  if (node.internal.type === `Mdx` && source === pagesPath) {
    const name = path.basename(node.fileAbsolutePath, `.mdx`)
    const lang = name === `index` ? i18n.defaultLocale : name.split(`.`)[1]

    const fieldData = {
      title: node.frontmatter.title,
      slug: fileNode.relativeDirectory,
      locale: lang
    }

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`)

    createNode({
      ...fieldData,
      id: mdxPageId,
      parent: node.id,
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    })

    createParentChildLink({parent: node, child: getNode(mdxPageId)})
  }
}

exports.createPages = async ({actions, graphql, reporter}, themeOptions) => {
  const {createPage} = actions

  const {basePath, tagsPath} = settings

  const result = await graphql(`
    query {
      allPost {
        nodes {
          slug
          locale
        }
      }
      allPage {
        nodes {
          slug
          locale
        }
      }
      postPerLocale: allPost {
        group(field: locale) {
          fieldValue
          totalCount
        }
      }
      tags: allPost(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue,
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
    return
  }

  const posts = result.data.allPost.nodes

  posts.forEach((post) => {
    const path = post.locale === i18n.defaultLocale ? post.slug : `/${post.locale}/${post.slug}`

    createPage({
      path: path.replace(/\/\/+/g, `/`),
      component: require.resolve(`./src/templates/post.tsx`),
      context: {
        slug: post.slug,
        locale: post.locale,
        formatString: i18n.locales[post.locale].dateFormat,
      },
    })
  })

  const postsPerLocale = result.data.postPerLocale.group

  postsPerLocale.forEach(locale => {
    const numPages = Math.ceil(locale.totalCount / settings.postsPerPage)
    const path = locale.fieldValue === i18n.defaultLocale ? '/' : `/${locale.fieldValue}`

    Array.from({length: numPages}).forEach((_, i) => {
      createPage({
        path: (i === 0 ? path : `${path}/${i + 1}`).replace(/\/\/+/g, `/`),
        component: require.resolve('./src/templates/home.tsx'),
        context: {
          limit: settings.postsPerPage,
          skip: i * settings.postsPerPage,
          numPages,
          formatString: i18n.locales[locale.fieldValue].dateFormat,
          currentPage: i + 1,
          locale: locale.fieldValue,
        },
      })
    });
  })

  const pages = result.data.allPage.nodes

  pages.forEach((page) => {
    const path = page.locale === i18n.defaultLocale ? page.slug : `/${page.locale}/${page.slug}`

    createPage({
      path: `${basePath}/${path}`.replace(/\/\/+/g, `/`),
      component: require.resolve(`./src/templates/page.tsx`),
      context: {
        slug: page.slug,
        locale: page.locale,
      },
    })
  })

  Object.keys(i18n.locales).map(lang => {
    graphql(`
    query ($locale: String!) {
      tags: allPost(filter: {locale: {eq: $locale}}) {
        group(field: tags___name) {
          fieldValue,
          totalCount
        }
      }
    }`, {locale: lang}).then(result => {
      const path = `${basePath}/${lang === i18n.defaultLocale ? '' : lang}/${tagsPath}`

      createPage({
        path: path.replace(/\/\/+/g, `/`),
        component: require.resolve(`./src/templates/tags.tsx`),
        context: {
          locale: lang
        },
      })

      const tags = result.data.tags.group

      tags.forEach((tag) => {
        const PageTotal = Math.ceil(tag.totalCount / settings.postsPerPage);
        const path = `${basePath}/${lang === i18n.defaultLocale ? '' : lang}/${tagsPath}/${kebabCase(tag.fieldValue)}`

        Array.from({length: PageTotal}).forEach((_, i) => {
          createPage({
            path: (i === 0 ? path : `${path}/${i + 1}`).replace(/\/\/+/g, `/`),
            component: require.resolve('./src/templates/tag.tsx'),
            context: {
              slug: kebabCase(tag.fieldValue),
              name: tag.fieldValue,
              formatString: i18n.locales[lang].dateFormat,
              limit: settings.postsPerPage,
              skip: i * settings.postsPerPage,
              currentPage: i + 1,
              totalPage: PageTotal,
              totalPost: tag.totalCount,
              locale: lang
            },
          });
        });
      })
    })
  })

}


// 404
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//
//   deletePage(page)
//
//   console.log(page)
//   Object.keys(i18n).map(lang => {
//     const path = lang === i18n.defaultLocale ? page.path : `/${lang}/${page.path}`
//
//     return createPage({
//       ...page,
//       path: path.replace(/\/\/+/g, `/`),
//       context: {
//         ...page.context,
//         locale: lang,
//         dateFormat: i18n[lang].dateFormat,
//       },
//     })
//   })
// }
