import {Metadata} from "next"
import {notFound} from "next/navigation"
import {site, SiteLocale} from "@/site"
import {getPosts} from "@/lib/fetch"
import React from "react"
import {getActivity} from "@/lib/fetch-activity"
import {Activity} from "@/components/activity"
import {Post} from "@/components/post"


export default async function Page({params: {slug: rawSlug, locale}}: {params: {slug: string, locale: SiteLocale}}) {
  const slug = decodeURI(rawSlug)

  const activity = await getActivity(slug)
  if (activity) return <Activity activity={activity} locale={locale}/>

  const posts = await getPosts({locale, lang: "all-lang", getDiscussion: false})
  const post = posts.find((post) => post.slug === slug)
  if (post) return <Post slug={slug} post={post} locale={locale}/>

  return notFound()
}


export async function generateMetadata({params}: {params: {slug: string, locale: SiteLocale}}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug)

  const activity = await getActivity(slug)
  if (activity) {
    return {
      title: activity.title,
      description: "",
      openGraph: {
        title: activity.title,
        description: "",
        siteName: site.title,
        locale: params.locale,
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

  const post = (await getPosts({locale: params.locale, lang: "all-lang", getDiscussion: false})).find((post) => post.slug === slug)
  if (post) {
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
}

export const generateStaticParams = async () => {
  const posts = await getPosts({locale: site.locales[0], lang: "all-lang", getDiscussion: false})
  return posts.map(post => ({slug: post.slug}))
}
