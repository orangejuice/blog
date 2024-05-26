import remarkGfm from "remark-gfm"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkFrontmatter from "remark-frontmatter"
import rehypeSlug from "rehype-slug"
import rehypePrismAll from "rehype-prism-plus"
import rehypePresetMinify from "rehype-preset-minify"
import {defineDocumentType, makeSource} from "contentlayer2/source-files"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {type: "string", required: true},
    date: {type: "date", required: true},
    updated: {type: "date", required: true},
    categories: {type: "string", required: true},
    tags: {type: "list", of: {type: "string"}, default: []}
  },
  computedFields: {
    slug: {type: "string", resolve: (post) => post._raw.sourceFileDir},
    locale: {type: "string", resolve: (post) => post._raw.sourceFileName}
  }
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {behavior: "prepend", headingProperties: {className: ["anchor"]}}],
      [rehypePrismAll, {defaultLanguage: "js", ignoreMissing: true}],
      rehypePresetMinify
    ]
  }
})