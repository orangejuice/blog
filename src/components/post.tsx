import {menu, SiteLocale} from "@/site"
import {cn, format, objectToUrlPart, useCssIndexCounter} from "@/lib/utils"
import initTranslation from "@/lib/i18n"
import {Icon} from "@/components/ui/icon"
import Link from "next/link"
import {InteractionBar} from "@/components/interaction-bar"
import {MDX} from "@/components/mdx"
import {Comment} from "@/components/comment"
import Toc from "@/components/toc"
import React from "react"

export const PostPage = async ({slug, post, locale}: {slug: string, post: Post, locale: SiteLocale}) => {
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <div className="grid md:grid-cols-[minmax(0,2fr),1fr] items-start gap-16 min-h-screen">
      <article className="flex flex-col gap-6 overflow-hidden">
        <section className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold animate-delay-in" style={cssIndexCounter()}>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-1 text-stone-500 dark:text-stone-400 font-medium text-sm animate-delay-in" style={cssIndexCounter()}>
            <time dateTime={post.date}>
              {t("post.publish", {date: format(post.date, {locale})})}
            </time>
            {post.updated != post.date && (<>
              <Icon.symbol.dot className="stroke-[4px] opacity-70"/>
              {t("post.update", {date: format(post.updated, {locale})})}
            </>)}
            {post.tags?.length > 0 && (<>
              <Icon.symbol.dot className="stroke-[4px] opacity-70"/>
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag, index) =>
                  <Link href={`/${menu.post}/${objectToUrlPart({lang: "all-lang", tag})}`} key={index} className={cn(
                    "flex items-center rounded-md transition px-1 py-0.5 text-sm -mx-1",
                    "hover:bg-stone-200 dark:hover:bg-stone-700")}>
                    <Icon.symbol.hash className="w-3 h-3 text-inherit"/> {tag}
                  </Link>)}
              </div>
            </>)}
            <Icon.symbol.dot className="stroke-[4px] opacity-70"/>
            <InteractionBar slug={slug}/>
          </div>
        </section>
        <MDX code={post.body.code} className="animate-delay-in" style={cssIndexCounter()}/>
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
  </>)
}
