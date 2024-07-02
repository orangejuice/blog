import RSS from "rss"
import {site, SiteLocale} from "@/site"
import {NextRequest} from "next/server"
import {getPosts} from "@/lib/fetch"

export async function GET(req: NextRequest, {params: {locale}}: {params: {locale: SiteLocale}}) {
  const posts = await getPosts({locale: locale, lang: locale, count: 5, getDiscussion: false})
  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.url,
    feed_url: site.url.concat("/feed.xml"),
    copyright: `Copyright © ${new Date().getFullYear()} • ${site.title}`,
    language: locale,
    pubDate: new Date()
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      url: site.url.concat("/", locale, "/").concat(post.slug),
      date: post.date,
      author: site.author,
      description: post.excerpt
    })
  })

  return new Response(feed.xml({indent: true}), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8"
    }
  })
}

export const generateStaticParams = () => {
  return site.locales.map((locale) => ({locale}))
}
