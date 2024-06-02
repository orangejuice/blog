import Link from "next/link"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {cn, formatDate} from "@/lib/utils"
import React, {ComponentPropsWithoutRef} from "react"
import {PostWithActivity, PostWithDiscussion} from "@/lib/fetch"
import Image from "next/image"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function PostCard({post}: {post: PostWithDiscussion}) {
  return (<>
    <li>
      <Link href={`/${post.slug}`} className="group flex flex-col items-start no-underline relative p-4 rounded-xl -mx-4 bg-transparent transition-colors hover:bg-amber-100/80 dark:hover:bg-white/10 gap-1">
        <h2 className={cn("flex items-center gap-2 text-gray-900 dark:text-gray-100 text-xl font-bold tracking-tight",
          "underline-fade underline-fade-with-group")}>
          {post.title}
          <Icons.link.arrow className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 -translate-x-1.5 stroke-[4px] transition-all ease-in-out duration-200 transform"/>
        </h2>
        <div className="flex items-center gap-1 flex-wrap">
          {post.tags.map((tag, index) =>
            <Button key={index} variant="secondary" className={cn("h-fit truncate px-1 py-0.5 text-xs text-stone-600",
              "dark:bg-stone-800 dark:text-stone-400 group-hover:bg-amber-200/80 dark:group-hover:bg-stone-700")}>
              {tag}
            </Button>)}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex w-full mt-2.5 text-xs justify-between font-medium text-neutral-800 dark:text-neutral-300">
          <p>Posted on <time dateTime={post.date}>{formatDate(post.date)}</time></p>
          <div className="flex items-center gap-4 text-stone-600">
            <span className="flex items-center gap-1"><Icons.post.reaction/> {post.discussion.reactions.totalCount}</span>
            <span className="flex items-center gap-1"><Icons.post.comment/> {post.discussion.comments.totalCount}</span>
          </div>
        </div>
      </Link>
    </li>
  </>)
}


export function ActivityCard({post}: {post: PostWithActivity}) {
  const activities = [...post.discussion.comments.nodes, ...post.discussion.reactions.nodes]
  activities.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  const activity = activities[0]

  const update = "author" in activity ? (<>
    <div className="flex items-center gap-2">
      <Image src={activity.author.avatarUrl} alt="" width={20} height={20} className="h-8 w-8 rounded-full"/>
      <div className="flex flex-col items-start text-stone-600">
        <span className="font-medium text-sm">{activity.author.login}</span>
        <time className="text-xs line-clamp-1">{dayjs().to(dayjs(activity.createdAt))}</time>
      </div>
    </div>
    <span className="flex gap-1 line-clamp-1 text-sm">
      <span>Replied:</span>
      <span className="font-medium">{activity.bodyText}</span>
    </span>
  </>) : (<>
    <div className="flex items-center gap-2 ">
      <Image src={activity.user.avatarUrl} alt="" width={20} height={20} className="h-8 w-8 rounded-full"/>
      <div className="flex flex-col items-start text-stone-600">
        <span className="font-medium text-sm">{activity.user.login}</span>
        <time className="text-xs line-clamp-1">{dayjs().to(dayjs(activity.createdAt))}</time>
      </div>
    </div>
    <span className="flex gap-2 line-clamp-1 text-sm">
      <span>Reacted:</span>
      {{"+1": "👍", "-1": "👎", "LAUGH": "😀", "HOORAY": "🎉", "CONFUSED": "🤔", "LOVE": "❤️", "ROCKET": "🚀", "EYE": "👀"}[activity.content]}
    </span>
  </>)

  return (<>
    <li>
      <Link href={`/${post.slug}`} className={cn("flex flex-col items-start px-4 py-2 rounded-md -mx-4 transition-colors gap-1",
        "hover:bg-stone-100 group dark:hover:bg-stone-800")}>
        {update}
        <p className={cn("w-full px-3 py-1 text-sm rounded-md font-medium text-stone-700 tracking-tight line-clamp-1",
          "group-hover:bg-stone-200 bg-stone-100 dark:bg-stone-800 dark:group-hover:bg-stone-700 dark:text-stone-400 transition-colors")}>
          {post.title}
        </p>
      </Link>
    </li>
  </>)
}

export function PostItemCompact({post}: {post: PostWithDiscussion}) {
  return (<>
    <li className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
      <time className={cn("md:w-28 text-secondary text-sm shrink-0")}>{formatDate(post.date)}</time>
      <div className="flex w-full justify-between gap-4">
        <Link href={`/${post.slug}`} className="font-medium line-clamp-1 underline-fade">{post.title}</Link>
        <div className="flex gap-4 text-xs text-stone-600">
          <span className="flex items-center gap-1"><Icons.post.reaction/> {post.discussion.reactions.totalCount}</span>
          <span className="flex items-center gap-1"><Icons.post.comment/> {post.discussion.comments.totalCount}</span>
        </div>
      </div>
    </li>
  </>)
}

export function PostCardList({posts, ...props}: {posts: PostWithDiscussion[]} & ComponentPropsWithoutRef<"ul">) {
  return (<>
    <ul className="flex flex-col gap-5 animate-delay-in" {...props}>
      {posts.map(post => <PostCard post={post} key={post.slug}/>)}
    </ul>
  </>)
}

export function LatestActivityList({posts, ...props}: {posts: PostWithActivity[]} & ComponentPropsWithoutRef<"ul">) {
  return (<>
    <ul className="flex flex-col gap-2" {...props}>
      {posts.map(post => <ActivityCard post={post} key={post.slug}/>)}
    </ul>
  </>)
}

export function PostCompactList({posts, ...props}: {posts: PostWithDiscussion[]} & ComponentPropsWithoutRef<"ul">) {
  return (<>
    <ul className="flex flex-col animate-delay-in" {...props}>
      {posts.length == 0 && <p>No posts found</p>}
      {posts.map((post, index) => <PostItemCompact post={post} key={index}/>)}
    </ul>
  </>)
}