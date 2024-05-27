import {allPosts} from "contentlayer/generated"
import {compareDesc} from "date-fns"

export const getPosts = () => {
  return allPosts.sort((a, b) => compareDesc(a.date, b.date))
}