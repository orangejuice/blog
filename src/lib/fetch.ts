import {allPosts, Post} from "contentlayer/generated"
import {giscusConfig, LangOption, site, SiteLocale} from "@/site"
import {Discussion, fetchDiscussions, fetchLatestActivities} from "@/lib/fetch-github"

type Options = {
  locale: SiteLocale
  filterLang?: LangOption
  filterTag?: string
  count?: number
  getDiscussion?: boolean
}

export const revalidate = 5

export const getPosts = async ({locale, filterLang, filterTag, count, getDiscussion = true}: Options) => {
  filterLang ??= locale

  const slugLangPost: {[slug: string]: {[locale: string]: Post}} = {}
  allPosts.forEach((cur) => {
    if (!slugLangPost[cur.slug]) slugLangPost[cur.slug] = {[cur.locale]: cur}
    else slugLangPost[cur.slug][cur.locale] = cur
  })

  const tagCheck = (post: Post) => filterTag ? post.tags.includes(filterTag) : true

  let postList: Post[] = []
  loop: for (const langPost of Object.values(slugLangPost)) {
    if (langPost[filterLang]) {
      tagCheck(langPost[filterLang]) && postList.push(langPost[filterLang])
      continue
    }
    if (filterLang !== "all-lang") continue
    for (const siteLocale of site.locales) {
      if (!langPost[siteLocale] || !tagCheck(langPost[siteLocale])) continue
      if (langPost[locale]) { postList.push(langPost[locale]) } else postList.push(langPost[siteLocale])
      continue loop
    }
    for (const post of Object.values(langPost)) {
      tagCheck(post) && postList.push(post)
    }
  }

  const discussions = getDiscussion ? await fetchDiscussions({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    titles: postList.map(post => post.slug)
  }) : {}

  postList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  if (count) postList = postList.slice(0, count)

  return postList.map((post) => {
    const discussion: Discussion = {comments: {totalCount: 0}, reactions: {totalCount: 0}}
    if (discussions[post.slug]) (post as PostWithDiscussion).discussion = discussions[post.slug]
    else (post as PostWithDiscussion).discussion = discussion
    return (post as unknown as PostWithDiscussion)
  })
}

export type PostWithDiscussion = Post & {discussion: Discussion}
export type GetPostResponse = Awaited<ReturnType<typeof getPosts>>

export const getLatestActivitiesPost = async ({locale, count}: {locale: SiteLocale, count: number}) => {
  const latestDiscussions = await fetchLatestActivities({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    count: count
  })
  const postsWithDiscussion: PostWithDiscussion[] = []

  const posts = (await getPosts({locale, filterLang: "all-lang", getDiscussion: false}))
  const slugPosts: {[slug: string]: PostWithDiscussion} = {}
  posts.forEach(post => slugPosts[post.slug] = post)

  Object.keys(latestDiscussions).forEach(slug => {
    if (slugPosts.hasOwnProperty(slug)) {
      slugPosts[slug].discussion = latestDiscussions[slug]
      postsWithDiscussion.push(slugPosts[slug] as PostWithDiscussion)
    }
  })
  return postsWithDiscussion
}


export const getTags = ({filterLang}: Options) => {
  const tagCount: {[tag: string]: number} = {}
  if (filterLang == "all-lang") {
    const slugTags: {[slug: string]: Set<string>} = {}
    allPosts.forEach(post => {
      if (slugTags.hasOwnProperty(post.slug)) post.tags.forEach(tag => slugTags[post.slug].add(tag))
      else slugTags[post.slug] = new Set(post.tags)
    })
    Object.values(slugTags).map(set => [...set]).flat().forEach(tag =>
      tagCount[tag] ? tagCount[tag]++ : tagCount[tag] = 1
    )
  } else {
    allPosts.filter(post => post.locale == filterLang).flatMap(post => post.tags).forEach(tag =>
      tagCount[tag] ? tagCount[tag]++ : tagCount[tag] = 1)
  }
  return Object.fromEntries(Object.entries(tagCount).sort(([, n1], [, n2]) => n2 - n1))
}

export type GetTagsResponse = ReturnType<typeof getTags>

const getSlugsGroupedByLocale = () => {
  const group: {[locale: string]: Set<string>} = {"all-lang": new Set()}
  allPosts.forEach(post => {
    if (!group[post.locale]) group[post.locale] = new Set()
    group[post.locale].add(post.slug)
    group["all-lang"].add(post.slug)
  })
  return group
}

export const getLocales = () => {
  const localeCount = Object.entries(getSlugsGroupedByLocale())
    .reduce((counter: {[locale: string]: number}, [locale, posts]) => {
      counter[locale] = posts.size
      return counter
    }, {})
  return Object.fromEntries(Object.entries(localeCount).sort(([, n1], [, n2]) => n2 - n1))
}


export type GetLocalesResponse = ReturnType<typeof getLocales>
