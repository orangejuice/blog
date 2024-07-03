import {Metadata} from "next"
import {notFound} from "next/navigation"
import {site, SiteLocale} from "@/site"
import {getPosts} from "@/lib/fetch"
import Toc from "@/components/toc"
import {cn, format, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import initTranslation from "@/lib/i18n"
import Link from "next/link"
import {MDX} from "@/components/mdx"
import React from "react"
import {Comment} from "@/components/comment"
import {InteractionBar} from "@/components/post-metadata"

export async function generateMetadata({params}: {params: {slug: string, locale: SiteLocale}}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug)

  const post = (await getPosts({locale: params.locale, lang: "all-lang", getDiscussion: false})).find((post) => post.slug === slug)
  if (!post) return

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: site.title,
      locale: params.locale,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
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
  const posts = await getPosts({locale: site.locales[0], lang: "all-lang", getDiscussion: false})
  return posts.map(post => ({slug: post.slug}))
}

export default async function Page({params}: {params: {slug: string, locale: SiteLocale}}) {
  const slug = decodeURI(params.slug)
  const cssIndexCounter = useCssIndexCounter()
  const posts = await getPosts({locale: params.locale, lang: "all-lang", getDiscussion: false})
  const post = posts.find((post) => post.slug === slug)
  if (!post) return notFound()

  const {t} = await initTranslation(params.locale)

  return <>
    <div className="grid md:grid-cols-[minmax(0,2fr),1fr] items-start gap-16 min-h-screen">
      <article className="flex flex-col gap-6 overflow-hidden">
        <section className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold animate-delay-in" style={cssIndexCounter()}>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-1 text-stone-500 dark:text-stone-400 font-medium text-sm animate-delay-in" style={cssIndexCounter()}>
            <time dateTime={post.date}>
              {t("post.publish", {date: format(post.date, {locale:params.locale})})}
            </time>
            {post.updated != post.date && (<>
              <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
              {t("post.update", {date: format(post.updated, {locale:params.locale})})}
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
              <InteractionBar slug={slug}/>
            </div>
          </div>
        </section>
        <MDX code={post.body.code} style={cssIndexCounter()}/>
        <Comment slug={slug}/>
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
  </>
}
