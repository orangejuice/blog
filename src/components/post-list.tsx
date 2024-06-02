import Link from "next/link"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {cn, formatDate} from "@/lib/utils"
import React, {ComponentPropsWithoutRef} from "react"
import {PostWithDiscussion} from "@/lib/fetch"

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

export function PostCompactList({posts, ...props}: {posts: PostWithDiscussion[]} & ComponentPropsWithoutRef<"ul">) {
  return (<>
    <ul className="flex flex-col animate-delay-in" {...props}>
      {posts.length == 0 && <p>No posts found</p>}
      {posts.map((post, index) => <PostItemCompact post={post} key={index}/>)}
    </ul>
  </>)
}