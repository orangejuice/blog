"use server"
import {allPosts} from "contentlayer/generated"
import {giscusConfig, site, SiteLocale} from "@/site"
import {DiscussionWithComments, fetchDiscussions, fetchLatestComments} from "@/lib/fetch-github"
import {getMetadata} from "@/lib/fetch-db"
import {unstable_cache as cache} from "next/cache"
import {getActivity} from "@/lib/fetch-activity"

/**
 * The function to get the list of post
 * @param locale user's language preference
 * @param lang filtering results by including the specified lang only
 * @param tag filtering results by a tag
 * @param count how many posts needed
 * @param discussion do we want to fetch discussion data for this post list
 */
export const getPosts = cache(async ({locale, lang, tag, count, discussion = true}: Options) => {
  lang ??= locale

  const slugLangPost: {[slug: string]: {[locale: string]: Post}} = {};

  (allPosts as Post[]).forEach((cur) => {
    if (!slugLangPost[cur.slug]) slugLangPost[cur.slug] = {[cur.locale]: cur}
    else slugLangPost[cur.slug][cur.locale] = cur
  })

  const tagCheck = (post: Post) => tag ? post.tags.includes(tag) : true

  let postList: Post[] = []
  loop: for (const langPost of Object.values(slugLangPost)) {
    if (langPost[lang]) {
      tagCheck(langPost[lang]) && postList.push(langPost[lang])
      continue
    }
    if (lang !== "all-lang") continue
    for (const siteLocale of site.locales) {
      if (!langPost[siteLocale] || !tagCheck(langPost[siteLocale])) continue
      if (langPost[locale]) { postList.push(langPost[locale]) } else postList.push(langPost[siteLocale])
      continue loop
    }
    for (const post of Object.values(langPost)) {
      tagCheck(post) && postList.push(post)
    }
  }

  const discussions = discussion ? await fetchDiscussions({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    titles: postList.map(post => post.slug)
  }) : {}

  const metadata = await getMetadata(postList.map(post => post.slug))

  postList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  if (count) postList = postList.slice(0, count)

  return postList.map((post) => {
    if (discussions[post.slug]) post.discussion = {comment: discussions[post.slug].comments.totalCount, reaction: discussions[post.slug].reactions.totalCount}
    else post.discussion = {comment: 0, reaction: 0}
    post.view = metadata[post.slug].view
    post.body.raw = ""
    return post
  })
})
export type GetPostsResponse = ReturnType<typeof getPosts>

export const getLatestComment = cache(async ({locale, count}: {locale: SiteLocale, count: number}) => {
  const latestActivities = await fetchLatestComments({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    count: count
  })
  const comments: (PostWithComments | ActivityWithComments)[] = []

  const posts = (await getPosts({locale, lang: "all-lang", discussion: false}))
  const slugPosts: {[slug: string]: Post} = {}
  posts.forEach(post => slugPosts[post.slug] = post)

  for (const slug of Object.keys(latestActivities)) {
    if (slugPosts.hasOwnProperty(slug) && latestActivities[slug].comments.nodes.length > 0) {
      comments.push({...slugPosts[slug], comments: latestActivities[slug].comments.nodes})
    } else {
      const activity = await getActivity(slug)
      if (activity) comments.push({...activity, comments: latestActivities[slug].comments.nodes})
    }
  }
  return comments
})
export type PostWithComments = Post & {comments: DiscussionWithComments["comments"]["nodes"]}
export type ActivityWithComments = Activity & {comments: DiscussionWithComments["comments"]["nodes"]}
export type GetLatestCommentResponse = ReturnType<typeof getLatestComment>

export const getTags = cache(async ({lang}: Options) => {
  const tagCount: {[tag: string]: number} = {}
  if (lang == "all-lang") {
    const slugTags: {[slug: string]: Set<string>} = {}
    allPosts.forEach(post => {
      if (slugTags.hasOwnProperty(post.slug)) post.tags.forEach(tag => slugTags[post.slug].add(tag))
      else slugTags[post.slug] = new Set(post.tags)
    })
    Object.values(slugTags).map(set => [...set]).flat().forEach(tag =>
      tagCount[tag] ? tagCount[tag]++ : tagCount[tag] = 1
    )
  } else {
    allPosts.filter(post => post.locale == lang).flatMap(post => post.tags).forEach(tag =>
      tagCount[tag] ? tagCount[tag]++ : tagCount[tag] = 1)
  }
  return Object.fromEntries(Object.entries(tagCount).sort(([, n1], [, n2]) => n2 - n1))
})
export type GetTagsResponse = ReturnType<typeof getTags>

export const getLocales = cache(async () => {
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
})
export type GetLocalesResponse = ReturnType<typeof getLocales>

type Options = {
  locale: SiteLocale
  lang?: SiteLocale | "all-lang"
  tag?: string
  count?: number
  discussion?: boolean
}
