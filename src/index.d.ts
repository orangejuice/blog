type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// https://github.com/giscus/giscus/blob/main/lib/types/giscus.ts
type IDiscussionData = {
  id: string
  url: string
  locked: boolean
  repository: {
    nameWithOwner: string
  }
  reactionCount: number
  totalCommentCount: number
  totalReplyCount: number
  reactions: IReactionGroups
}
