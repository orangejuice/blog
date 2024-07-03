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

type Interactions = {
  [slug: string]: {
    view: number
    viewed: boolean
    discussion: { [key in "comment" | "reaction"]: number }
  }
}

type StickyNotes = {
  order?: string[]
  [id: string]: {
    position: { [key in "x" | "y"]: number }
    color: string
    rotate: string
  }
}
// import("framer-motion").MotionValue<number | undefined>
