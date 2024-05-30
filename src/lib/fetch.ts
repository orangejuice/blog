import {allPosts, Post} from "contentlayer/generated"
import {LangOption, site, SiteLocale} from "@/site"

type Options = {
  locale: SiteLocale
  filterLocale?: LangOption
  filterTag?: string
}

export const getPosts = ({locale, filterLocale, filterTag}: Options) => {
  filterLocale ??= locale
  const slugLangPost: {[slug: string]: {[locale: string]: Post}} = {}
  allPosts.forEach((cur) => {
    if (!slugLangPost[cur.slug]) slugLangPost[cur.slug] = {[cur.locale]: cur}
    else slugLangPost[cur.slug][cur.locale] = cur
  })
  const tagCheck = (post: Post) => filterTag ? post.tags.includes(filterTag) : true

  const postList: Post[] = []
  loop: for (const langPost of Object.values(slugLangPost)) {
    if (langPost[filterLocale]) {
      tagCheck(langPost[filterLocale]) && postList.push(langPost[filterLocale])
      continue
    }
    if (filterLocale !== "all-lang") continue
    if (langPost[locale]) {
      tagCheck(langPost[locale]) && postList.push(langPost[locale])
      continue
    }
    for (const siteLocale of site.locales) {
      if (langPost[siteLocale]) {
        tagCheck(langPost[siteLocale]) && postList.push(langPost[siteLocale])
        continue loop
      }
    }
    tagCheck(Object.values(langPost)[0]) && postList.push(Object.values(langPost)[0])
  }

  return postList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export const getPostsGroupedByTag = (params: Options) => {
  const group: {[tag: string]: Post[]} = {}
  getPosts(params).forEach(post => {
    post.tags.forEach(tag => {
      if (!group[tag]) group[tag] = []
      group[tag].push(post)
    })
  })
  return group
}

export const getTags = (params: Options) => {
  const tagCount = Object.entries(getPostsGroupedByTag(params))
    .reduce((counter: {[tag: string]: number}, [tag, posts]) => {
      counter[tag] = posts.length
      return counter
    }, {})
  return Object.fromEntries(Object.entries(tagCount).sort(([, n1], [, n2]) => n2 - n1))
}

export type GetTagsResponse = ReturnType<typeof getTags>

export const getSlugsGroupedByLocale = (params: Options) => {
  const group: {[locale: string]: Set<string>} = {"all-lang": new Set()}
  allPosts.forEach(post => {
    if (!group[post.locale]) group[post.locale] = new Set()
    group[post.locale].add(post.slug)
    group["all-lang"].add(post.slug)
  })
  return group
}

export const getLocales = (params: Options) => {
  const localeCount = Object.entries(getSlugsGroupedByLocale(params))
    .reduce((counter: {[locale: string]: number}, [locale, posts]) => {
      counter[locale] = posts.size
      return counter
    }, {})
  return Object.fromEntries(Object.entries(localeCount).sort(([, n1], [, n2]) => n2 - n1))
}


export type GetLocalesResponse = ReturnType<typeof getLocales>
