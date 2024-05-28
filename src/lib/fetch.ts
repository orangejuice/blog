import {allPosts, Post} from "contentlayer/generated"

export const getPosts = () => {
  return allPosts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export const getPostsGroupedByTag = () => {
  const group: {[tag: string]: Post[]} = {}
  getPosts().forEach(post => {
    post.tags.forEach(tag => {
      if (!group[tag]) group[tag] = []
      group[tag].push(post)
    })
  })
  return group
}

export const getTags = () => {
  const tagCount = Object.entries(getPostsGroupedByTag()).reduce((counter: {[tag: string]: number}, [tag, posts]) => {
    counter[tag] = posts.length
    return counter
  }, {})
  return Object.fromEntries(Object.entries(tagCount).sort(([, n1], [, n2]) => n2 - n1))
}

export const getPostsGroupedByLocale = () => {
  const group: {[locale: string]: Post[]} = {}
  getPosts().forEach(post => {
    if (!group[post.locale]) group[post.locale] = []
    group[post.locale].push(post)
  })
  return group
}

export const getLocales = () => {
  const localeCount = Object.entries(getPostsGroupedByLocale()).reduce((counter: {[locale: string]: number}, [locale, posts]) => {
    counter[locale] = posts.length
    return counter
  }, {})
  return Object.fromEntries(Object.entries(localeCount).sort(([, n1], [, n2]) => n2 - n1))
}