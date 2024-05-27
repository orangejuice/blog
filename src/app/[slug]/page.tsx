import "./code-highlight.css"

import {Metadata} from "next"
import {notFound} from "next/navigation"
import {allPosts} from "contentlayer/generated"
import {site} from "@/site"
import {compareDesc} from "date-fns"
import {getPosts} from "@/lib/fetch"
import {MDX} from "@/components/mdx"

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug)
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) return

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.updated).toISOString()

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: site.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      authors: site.author
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt
    }
  }
}

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({slug: post.slug}))
}

export default async function Page({params}: {params: {slug: string}}) {
  const slug = decodeURI(params.slug)
  const posts = getPosts()
  const postIndex = posts.findIndex((post) => post.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = posts[postIndex - 1]
  const next = posts[postIndex + 1]
  const post = allPosts.find((post) => post.slug == slug)

  if (!post) return notFound()
  return (
    <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">

      <MDX post={post}/>
      {/*<Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>*/}
      {/*  <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc}/>*/}
      {/*</Layout>*/}
    </div>
  )
}
