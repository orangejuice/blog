import {MetadataRoute} from "next"
import {menu, site} from "@/site"
import {getPosts} from "@/lib/fetch"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts({locale: site.locales[0], filterLang: "all-lang", getDiscussion: false})

  const getAllLang = (slug: string) => {
    const langUrl: {[lang: string]: string} = {}
    site.locales.forEach(locale => {
      langUrl[locale] = `${site.url}${locale == site.locales[0] ? "/" : `/${locale}/`}${slug}`
    })

    return langUrl
  }

  return posts.map((post) => ({
    url: `${site.url}/${post.slug}`,
    lastModified: new Date(),
    alternates: {languages: getAllLang(post.slug)}
  })).concat(Object.values(menu).map(nav => ({
    url: `${site.url}/${nav}`,
    lastModified: new Date(),
    alternates: {languages: getAllLang(nav)}
  })))
}
