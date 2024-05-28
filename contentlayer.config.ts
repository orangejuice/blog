import remarkGfm from "remark-gfm"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkFrontmatter from "remark-frontmatter"
import rehypeSlug from "rehype-slug"
import rehypePrismAll from "rehype-prism-plus"
import rehypePresetMinify from "rehype-preset-minify"
import {defineDocumentType, makeSource} from "contentlayer2/source-files"
import removeMarkdown from "remove-markdown"
import {HashIcon} from "lucide-react"
import Server from "react-dom/server"
import React from "react"
import {fromHtmlIsomorphic} from "hast-util-from-html-isomorphic"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/post*.md",
  contentType: "mdx",
  fields: {
    title: {type: "string", required: true},
    date: {type: "date", required: true},
    // @ts-ignore
    updated: {type: "date", default: null},
    tags: {type: "list", of: {type: "string"}, default: []}
  },
  computedFields: {
    excerpt: {type: "string", resolve: post => extractExcerpt(post.body.raw, 200)},
    updated: {type: "date", resolve: (post) => post.updated ?? post.date},
    slug: {type: "string", resolve: (post) => post._raw.sourceFileDir},
    locale: {type: "string", resolve: (post) => post._raw.sourceFileName.split(".")[1]},
  }
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        headingProperties: {className: ["heading-anchor"]},
        content: fromHtmlIsomorphic(Server.renderToStaticMarkup(React.createElement(HashIcon)), {fragment: true})
      }],
      [rehypePrismAll, {defaultLanguage: "js", ignoreMissing: true}],
      rehypePresetMinify
    ]
  }
})

export function extractExcerpt(markdown: string, wordLimit: number) {
  const str = removeMarkdown(markdown)
  const arr = [...str]
  return arr.slice(0, wordLimit).concat(arr.length > wordLimit ? "..." : "").join("")
}
