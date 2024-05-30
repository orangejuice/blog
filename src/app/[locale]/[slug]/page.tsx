import "./code-highlight.css"
import "./page.css"
import {Metadata} from "next"
import {notFound} from "next/navigation"
import {allPosts} from "contentlayer/generated"
import {site, SiteLocale} from "@/site"
import {getPosts} from "@/lib/fetch"
import {useMDXComponent} from "next-contentlayer2/hooks"
import Toc from "@/components/toc"
import {ReactionsButtons} from "@/components/reactions"
import {Comments} from "@/components/comments"
import {formatDate, useCssIndexCounter} from "@/lib/utils"

export async function generateMetadata({params}: {params: {slug: string, locale: string}}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug)

  const post = allPosts.find((post) => post.slug === slug)
  if (!post) return

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: site.title,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated).toISOString(),
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

export default async function Page({params}: {params: {slug: string, locale: SiteLocale}}) {
  const slug = decodeURI(params.slug)
  const posts = getPosts({locale: params.locale, accept: "all-lang"})
  const postIndex = posts.findIndex((post) => post.slug === slug)
  if (postIndex === -1) return notFound()

  const MDXContent = useMDXComponent(posts[postIndex].body.code)
  const post = posts[postIndex]
  const prev = posts[postIndex - 1]
  const next = posts[postIndex + 1]
  const cssIndexCounter = useCssIndexCounter()

  return <>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-16 min-h-screen">
      <article className="overflow-auto">
        <section className="flex flex-col gap-3 mb-8">
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{post.title}</h1>
          <p className="text-secondary animate-delay-in" style={cssIndexCounter()}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated ? ` (Updated ${formatDate(post.updated)})` : ""}{" "}
          </p>
        </section>
        <div className="prose toc-content max-w-none dark:prose-invert animate-delay-in" style={cssIndexCounter()}>
          <MDXContent/>
        </div>
        <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
          <Comments/>
        </div>
      </article>
      <aside className="flex flex-col sticky top-8 gap-4 animate-delay-in" style={cssIndexCounter()}>
        <Toc/>
        <hr/>
        <div className="flex flex-col gap-2 dark:bg-gray-800">
          <section className="py-2 pl-2 text-slate-700 text-sm leading-6">
            <ReactionsButtons slug={slug} initialCounters={{likes: 2, loves: 5, awards: 1}}/>
          </section>
        </div>
      </aside>
    </div>
  </>
}
