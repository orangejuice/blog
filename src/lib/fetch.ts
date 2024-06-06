import {allPosts, Post} from "contentlayer/generated"
import {giscusConfig, LangOption, site, SiteLocale} from "@/site"
import {Activity, Discussion, fetchDiscussions, fetchLatestActivities} from "@/lib/fetch-github"
import {unstable_cache as cache} from "next/cache"

/**
 * The function to get the list of post
 * @param locale user's language preference
 * @param filterLang filtering results by including the specified lang only
 * @param filterTag filtering results by a tag
 * @param count how many posts needed
 * @param getDiscussion do we want to fetch discussion data for this post list
 */
export const getPosts = cache(async ({locale, filterLang, filterTag, count, getDiscussion = true}: Options) => {
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
    post.body.raw = ""

    return (post as unknown as PostWithDiscussion)
  })
})
export type PostWithDiscussion = Post & {discussion: Discussion}
export type GetPostsResponse = ReturnType<typeof getPosts>

export const getLatestActivitiesPost = cache(async ({locale, count}: {locale: SiteLocale, count: number}) => {
  const latestActivities = await fetchLatestActivities({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    count: count
  })
  const postsWithActivity: PostWithActivity[] = []

  const posts = (await getPosts({locale, filterLang: "all-lang", getDiscussion: false}))
  const slugPosts: {[slug: string]: PostWithDiscussion} = {}
  posts.forEach(post => slugPosts[post.slug] = post)

  Object.keys(latestActivities).forEach(slug => {
    if (slugPosts.hasOwnProperty(slug) && (latestActivities[slug].comments.nodes.length > 0 || latestActivities[slug].reactions.nodes.length > 0)) {
      slugPosts[slug].discussion = latestActivities[slug]
      postsWithActivity.push(slugPosts[slug] as PostWithActivity)
    }
  })
  return postsWithActivity
})
export type PostWithActivity = Post & {discussion: Activity}
export type GetLatestActivitiesResponse = ReturnType<typeof getLatestActivitiesPost>

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

export const getLocales = () => {
  const group: {[locale: string]: Set<string>} = {"all-lang": new Set()}
  allPosts.forEach(post => {
    if (!group[post.locale]) group[post.locale] = new Set()
    group[post.locale].add(post.slug)
    group["all-lang"].add(post.slug)
  })

  const localeCount = Object.entries(group)
    .reduce((counter: {[locale: string]: number}, [locale, posts]) => {
      counter[locale] = posts.size
      return counter
    }, {})
  return Object.fromEntries(Object.entries(localeCount).sort(([, n1], [, n2]) => n2 - n1))
}
export type GetLocalesResponse = ReturnType<typeof getLocales>

type Options = {
  locale: SiteLocale
  filterLang?: LangOption
  filterTag?: string
  count?: number
  getDiscussion?: boolean
}
