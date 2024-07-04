import {Metadata} from "next"
import {notFound} from "next/navigation"
import {menu, site, SiteLocale} from "@/site"
import {getPosts, PostWithMetadata} from "@/lib/fetch"
import Toc from "@/components/toc"
import {cn, format, objectToUrlPart, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import initTranslation from "@/lib/i18n"
import Link from "next/link"
import {MDX} from "@/components/mdx"
import React from "react"
import {Comment} from "@/components/comment"
import {InteractionBar} from "@/components/post-metadata"
import {getActivity} from "@/lib/fetch-activity"
import {Activity as ActivityType, History as HistoryType} from "contentlayer/generated"
import {Image} from "@/components/ui/image"
import {StarRating} from "@/components/activity-list"

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

export default async function Page({params: {slug: rawSlug, locale}}: {params: {slug: string, locale: SiteLocale}}) {
  const slug = decodeURI(rawSlug)

  const activity = await getActivity(slug)
  if (activity) return <Activity activity={activity} locale={locale}/>

  const posts = await getPosts({locale, lang: "all-lang", getDiscussion: false})
  const post = posts.find((post) => post.slug === slug)
  if (post) return <Post slug={slug} post={post} locale={locale}/>
  else return notFound()
}

const Activity = async ({activity, locale}: {activity: ActivityType, locale: SiteLocale}) => {
  const Icon = Icons.type[`${activity.category}`]
  const {t} = await initTranslation(locale)

  return (<>
    <div className="grid md:grid-cols-[3fr,2fr] grid-rows-[min-content] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row items-start gap-4 md:gap-6">
          <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
            <Image src={activity.cover} alt="cover"/>
          </div>
          <div className="flex flex-col grow text-stone-600 text-sm">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">{activity.title}</h2>
              <div className="relative flex items-center gap-1 text-xs rounded-full font-medium text-stone-500">
                <Icon/><span>{t(`bookshelf.category.${activity.category}`)}</span>
              </div>
            </div>
            <StarRating rating={activity.douban?.rating}>
              {!!activity.douban?.rating ? <>
                <span className="ml-1 font-medium text-yellow-600 font-mono tracking-[-0.15em]">
                  {activity.douban?.rating?.toFixed(1)}
                </span>
              </> : <span className="ml-1 font-mono text-xs">{t("bookshelf.rating.0")}</span>}
            </StarRating>
            <p className="text-xs mt-0.5 mb-2">{activity.douban?.subtitle}</p>
          </div>
        </div>
      </div>
      <ul className="row-start-2 md:row-start-1 md:col-start-2 md:row-span-2">
        {[{status: activity.status, rating: activity.rating, date: activity.date, comment: undefined} as PartialBy<HistoryType, "status" | "rating" | "comment"> & {date: string}].concat(
          ...(activity.douban?.history ?? [])).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((history, index) => (
          <li key={index} className="relative [&:not(:last-child)]:pb-8">
            <span className="absolute top-5 left-5 -ml-[0.5px] h-[calc(100%-1rem)] w-px bg-stone-300" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3 text-stone-300">
              <div className="flex items-center w-6 h-6">
                <Icons.symbol.dot style={{color: index == 0 ? `var(--color-${activity.category}-2` : undefined}} className="mx-3 stroke-[5px]"/>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-md text-stone-500">
                  <p className="font-medium text-stone-900">
                    {t(`bookshelf.${activity.category}.status.${history.status}`, {date: ""})}
                  </p>
                  <span className="whitespace-nowrap text-xs">
                    {format(history.date, {locale})}
                  </span>
                </div>
                {index == 0 &&
                  <MDX code={activity.body.code} className="prose-sm prose-p:mt-0 text-stone-800 dark:text-stone-400"/>}
                {history.comment &&
                  <p className="text-stone-800 dark:text-stone-400 text-sm whitespace-pre-wrap">
                    {history.comment}
                  </p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Comment slug={activity.slug}/>
    </div>
  </>)
}


const Post = async ({slug, post, locale}: {slug: string, post: PostWithMetadata, locale: SiteLocale}) => {
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
              <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
              {t("post.update", {date: format(post.updated, {locale})})}
            </>)}
            {post.tags?.length > 0 && (<>
              <Icons.symbol.dot className="stroke-[4px] opacity-70"/>
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag, index) =>
                  <Link href={`/${menu.post}/${objectToUrlPart({lang: "all-lang", tag})}`} key={index} className={cn(
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
  </>)
}
