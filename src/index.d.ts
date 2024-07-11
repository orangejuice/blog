declare global {
  interface Document {
    startViewTransition?: (callback: Function) => void
  }

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  type UseState<T> = {
    value: T
    setValue: (update: T | ((val: T) => T)) => void
  }

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
    }
  }

  type Discussion = { [key in "comment" | "reaction"]: number }

  type Post = import("contentlayer/generated").Post & {view: number} & {discussion: Discussion}
  type Activity = import("contentlayer/generated").Activity & {view: number}

  type StickyNotes = {
    order?: string[]
    [id: string]: {
      position: { [key in "x" | "y"]: number }
      color: string
      rotate: string
    }
  }
}

// the only solution that make it possible to work with import smoothly in this index.d.ts for me
// credits to https://stackoverflow.com/a/70592854!
export {}
