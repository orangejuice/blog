import {Metadata} from "next"
import {notFound} from "next/navigation"
import {site, SiteLocale} from "@/site"
import {getPosts} from "@/lib/fetch"
import React from "react"
import {getActivity} from "@/lib/fetch-activity"
import {ActivityPage} from "@/components/activity"
import {PostPage} from "@/components/post"


export default async function Page({params: {slug, locale}}: {params: {slug: string, locale: SiteLocale}}) {
  const activity = await getActivity({slug, locale})
  if (activity) return <ActivityPage slug={slug} activity={activity} locale={locale}/>

  const post = (await getPosts({locale, lang: "all-lang", discussion: false})).find((post) => post.slug === slug)
  if (post) return <PostPage slug={slug} post={post} locale={locale}/>

  return notFound()
}


export async function generateMetadata({params: {slug, locale}}: {params: {slug: string, locale: SiteLocale}}): Promise<Metadata | undefined> {

  const activity = await getActivity({slug, locale})
  if (activity) {
    return {
      title: activity.title,
      description: "",
      openGraph: {
        title: activity.title,
        description: "",
        siteName: site.title,
        locale,
        type: "article",
        publishedTime: new Date(activity.date).toISOString(),
        url: "./",
        authors: site.author
      },
      twitter: {
        card: "summary_large_image",
        title: activity.title,
        description: ""
      }
    }
  }

  const post = (await getPosts({locale, lang: "all-lang", discussion: false})).find((post) => post.slug === slug)
  if (post) {
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        siteName: site.title,
        locale,
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
}

export const generateStaticParams = async () => {
  return site.locales.map(async locale => {
    const posts = await getPosts({locale, lang: "all-lang", discussion: false})
    return posts.map(post => ({locale, slug: post.slug}))
  }).flat()
}
