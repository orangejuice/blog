import {allPosts, Post} from "contentlayer/generated"
import {LangOption, site, SiteLocale} from "@/site"

type Options = {
  locale: SiteLocale
  accept?: LangOption
}

export const getPosts = ({locale, accept}: Options) => {
  accept ??= locale
  const slugLangPost: {[slug: string]: {[locale: string]: Post}} = {}
  allPosts.forEach((cur) => {
    if (!slugLangPost[cur.slug]) slugLangPost[cur.slug] = {[cur.locale]: cur}
    else slugLangPost[cur.slug][cur.locale] = cur
  })

  const postList: Post[] = []
  loop: for (const langPost of Object.values(slugLangPost)) {
    if (langPost[accept]) {
      postList.push(langPost[accept])
      continue
    }
    if (accept !== "all-lang") continue
    if (langPost[locale]) {
      postList.push(langPost[locale])
      continue
    }
    for (const siteLocale of site.locales) {
      if (langPost[siteLocale]) {
        postList.push(langPost[siteLocale])
        continue loop
      }
    }
    postList.push(Object.values(langPost)[0])
  }

  return postList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export const getPostsGroupedByTag = ({locale, accept}: Options) => {
  const group: {[tag: string]: Post[]} = {}
  getPosts({locale, accept}).forEach(post => {
    post.tags.forEach(tag => {
      if (!group[tag]) group[tag] = []
      group[tag].push(post)
    })
  })
  return group
}

export const getTags = ({locale, accept}: Options) => {
  const tagCount = Object.entries(getPostsGroupedByTag({locale, accept}))
    .reduce((counter: {[tag: string]: number}, [tag, posts]) => {
      counter[tag] = posts.length
      return counter
    }, {})
  return Object.fromEntries(Object.entries(tagCount).sort(([, n1], [, n2]) => n2 - n1))
}

export type GetTagsResponse = ReturnType<typeof getTags>

export const getPostsGroupedByLocale = ({locale, accept}: Options) => {
  const group: {[locale: string]: Post[]} = {"all-lang": []}
  getPosts({locale, accept}).forEach(post => {
    if (!group[post.locale]) group[post.locale] = []
    group[post.locale].push(post)
    group["all-lang"].push(post)
  })
  return group
}

export const getLocales = ({locale, accept}: Options) => {
  const localeCount = Object.entries(getPostsGroupedByLocale({locale, accept}))
    .reduce((counter: {[locale: string]: number}, [locale, posts]) => {
      counter[locale] = posts.length
      return counter
    }, {})
  return Object.fromEntries(Object.entries(localeCount).sort(([, n1], [, n2]) => n2 - n1))
}


export type GetLocalesResponse = ReturnType<typeof getLocales>
