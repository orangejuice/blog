import {allPosts} from "contentlayer/generated"

export const getPosts = () => {
  return allPosts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}