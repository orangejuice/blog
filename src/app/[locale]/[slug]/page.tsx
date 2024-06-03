import "./page.css"
import {Metadata} from "next"
import {notFound} from "next/navigation"
import {allPosts} from "contentlayer/generated"
import {site, SiteLocale} from "@/site"
import {getPosts} from "@/lib/fetch"
import Toc from "@/components/toc"
import {cn, formatDate, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import initTranslation from "@/i18n"
import Link from "next/link"
import {MDX} from "@/components/mdx"
import {Comments} from "@/components/comments"
import {PostCanvas} from "@/components/post-canvas"
import React from "react"
import {Interactions} from "@/app/[locale]/[slug]/page-client"

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
  return (site.locales.map(locale => allPosts.map((post) => ({slug: post.slug, locale: locale}))))
}

export default async function Page({params}: {params: {slug: string, locale: SiteLocale}}) {
  const slug = decodeURI(params.slug)
  const cssIndexCounter = useCssIndexCounter()
  const posts = await getPosts({locale: params.locale, filterLang: "all-lang", getDiscussion: false})
  const post = posts.find((post) => post.slug === slug)
  if (!post) return notFound()

  const isPostUpdated = post.updated && (post.updated != post.date)
  const {t} = await initTranslation(params.locale)

  return <>
    <div className="grid md:grid-cols-[minmax(0,2fr),1fr] items-start gap-16 min-h-screen">
      <article>
        <section className="flex flex-col gap-3 mb-8">
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-1 text-stone-500 dark:text-stone-400 font-medium text-sm animate-delay-in" style={cssIndexCounter()}>
            <time dateTime={post.date}>
              {t("post.publish", {date: formatDate(post.date, params.locale)})}
            </time>
            {isPostUpdated && (<>
              <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
              {t("post.update", {date: formatDate(post.updated, params.locale)})}
            </>)}
            {post.tags?.length > 0 && (<>
              <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag, index) =>
                  <Link href={`/all/${params.locale}/${tag}`} key={index} className={cn(
                    "flex items-center rounded-md transition px-1 py-0.5 text-sm -mx-1",
                    "hover:bg-stone-200 dark:hover:bg-stone-700")}>
                    <Icons.symbol.hash className="w-3 h-3 text-inherit"/> {tag}
                  </Link>)}
              </div>
            </>)}
            <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
            <div className="flex items-center gap-2">
              <Interactions slug={slug}/>
            </div>
          </div>
        </section>
        <MDX code={post.body.code} style={cssIndexCounter()}/>
        <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300 animate-delay-in" id="comment">
          <Comments slug={slug}/>
        </div>
      </article>
      <aside className="flex flex-col sticky top-8 gap-4 animate-delay-in" style={cssIndexCounter()}>
        <Toc/>
        <hr className="dark:border-stone-700"/>
        {/*<div className="flex flex-col gap-2">*/}
        {/*  <section className="py-2 pl-2 text-slate-700 text-sm leading-6">*/}
        {/*    <ReactionsButtons slug={slug} initialCounters={{likes: 2, loves: 5, awards: 1}}/>*/}
        {/*  </section>*/}
        {/*</div>*/}
      </aside>
    </div>
    <PostCanvas/>
  </>
}
