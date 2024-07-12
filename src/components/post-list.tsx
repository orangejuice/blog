"use client"
import Link from "next/link"
import {Icon} from "@/components/ui/icon"
import {Button} from "@/components/ui/button"
import {cn, format, shortenNumber} from "@/lib/utils"
import React, {ComponentPropsWithoutRef, use, useEffect} from "react"
import type {GetLatestCommentResponse, GetPostsResponse} from "@/lib/fetch"
import Image from "next/image"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useTranslation} from "react-i18next"
import {BounceBackground} from "@/components/generic"
import {useGlobalState} from "@/lib/use-global-state"
import {useMounted} from "@/lib/use-mounted"
import {PostMainListPlaceholder} from "@/components/loading"


function PostCard({post}: {post: Post}) {
  const {t, i18n: {language: locale}} = useTranslation()

  return (<>
    <li>
      <Link href={`/${post.slug}`} className="group relative flex flex-col items-start no-underline p-4 -mx-4 gap-1">
        <h2 className={cn("flex items-center gap-2 text-gray-900 dark:text-gray-100 text-xl font-bold tracking-tight",
          "underline-fade underline-fade-with-group")}>
          {post.title}
          <Icon.link.arrow className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 -translate-x-1.5 stroke-[4px] transition-all ease-in-out duration-200 transform"/>
        </h2>
        <div className="flex items-center gap-1 flex-wrap">
          {post.tags.map((tag, index) =>
            <Button key={index} variant="secondary" className={cn("h-fit truncate px-1 py-0.5 text-xs text-stone-600",
              "dark:bg-stone-800 dark:text-stone-400 group-hover:bg-stone-200 dark:group-hover:bg-stone-700")}>
              {t(tag, {ns:"tag"})}
            </Button>)}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex w-full mt-2.5 text-xs justify-between font-medium text-neutral-800 dark:text-neutral-300">
          <p>{t("post.publish", {date: format(post.date, {locale})})}</p>
          <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1"><Icon.post.view/> {post.view}</span>
            <span className="flex items-center gap-1"><Icon.post.reaction/> {post.discussion.reaction}</span>
            <span className="flex items-center gap-1"><Icon.post.comment/> {post.discussion.comment}</span>
          </div>
        </div>
        <BounceBackground/>
      </Link>
    </li>
  </>)
}

function LatestPostCommentCard({comment}: {comment: Awaited<GetLatestCommentResponse>[number]}) {
  const activity = comment.comments[0]
  const {t, i18n: {language: locale}} = useTranslation()

  return (<>
    <li>
      <Link href={`/${comment.slug}`} className={cn("flex flex-col relative group items-start px-4 py-2 -mx-4 gap-2")}>
        <div className="flex items-center gap-2">
          <Image src={activity.author.avatarUrl} alt="" width={20} height={20} className="h-8 w-8 rounded-full"/>
          <div className="flex flex-col items-start text-stone-600 dark:text-stone-400">
            <span className="font-medium text-sm">{activity.author.login}</span>
            <time className="text-xs line-clamp-1">{format(activity.createdAt, {locale, relative: true})}</time>
          </div>
        </div>
        <span className="flex gap-1 text-sm">
          <span>{t("post.replied")}</span>
          <span className="font-medium line-clamp-1">{activity.bodyText}</span>
        </span>
        <p className={cn("w-full px-3 py-1 text-sm rounded-md font-medium text-stone-700 tracking-tight line-clamp-1",
          "group-hover:bg-stone-200 bg-stone-100 dark:bg-stone-800 dark:group-hover:bg-stone-700 dark:text-stone-400 transition-colors")}>
          {comment.title}
        </p>
        <BounceBackground/>
      </Link>
    </li>
  </>)
}

function PostItemCompact({post}: {post: Post}) {
  const {i18n: {language: locale}} = useTranslation()

  return (<>
    <li className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
      <div className="flex w-full md:w-fit text-stone-600 dark:text-stone-400 items-center justify-between">
        <time className={cn("md:w-28 text-secondary text-sm shrink-0")}>{format(post.date, {locale, localizeDate: true})}</time>
        <div className="gap-4 text-xs w-fit flex md:hidden">
          <span className="flex items-center gap-1"><Icon.post.view/>{shortenNumber(post.view)}</span>
          <span className="flex items-center gap-1"><Icon.post.reactComment/>{shortenNumber(post.discussion.reaction + post.discussion.comment)}</span>
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <Link href={`/${post.slug}`} className="font-medium w-full md:w-fit line-clamp-2 md:line-clamp-1 underline-fade">{post.title}</Link>
        <div className="gap-4 text-xs text-stone-600 dark:text-stone-400 flex max-md:hidden">
          <span className="flex items-center gap-1 cursor-default"><Icon.post.view/>{shortenNumber(post.view)}</span>
          <span className="flex items-center gap-1 cursor-default"><Icon.post.reactComment/>{shortenNumber(post.discussion.reaction + post.discussion.comment)}</span>
        </div>
      </div>
    </li>
  </>)
}

function PostCardList({posts: data, ...props}: {posts: GetPostsResponse} & ComponentPropsWithoutRef<"ul">) {
  const posts = use(data)
  const [_, setPosts] = useGlobalState<Post[]>("post-data", [])
  useEffect(() => {setPosts(posts)}, [posts, setPosts])

  return (<>
    <ul className="flex flex-col gap-5 animate-delay-in" {...props}>
      {posts.map(post => <PostCard post={post} key={post.slug}/>)}
    </ul>
  </>)
}

export function PostCompactList({posts: data, ...props}: {posts: GetPostsResponse} & ComponentPropsWithoutRef<"ul">) {
  const posts = use(data)
  const [_, setPosts] = useGlobalState<Post[]>("post-data", [])
  useEffect(() => {setPosts(posts)}, [posts, setPosts])
  const {t} = useTranslation()

  return (<>
    <ul className="flex flex-col animate-delay-in" {...props}>
      {posts.length == 0 && <p>{t("post.no-post")}</p>}
      {posts.map((post, index) => <PostItemCompact post={post} key={index}/>)}
    </ul>
  </>)
}

export function LatestCommentList({data, ...props}: {data: GetLatestCommentResponse} & ComponentPropsWithoutRef<"ul">) {
  const comments = use(data)

  return (<>
    <ul className="flex flex-col gap-2" {...props}>
      {comments.map(comment => <LatestPostCommentCard comment={comment} key={comment.slug}/>)}
    </ul>
  </>)
}

export function PostMainList({postsOneLang, postsAllLang, ...props}:
  ComponentPropsWithoutRef<"ul"> & {postsOneLang: GetPostsResponse, postsAllLang: GetPostsResponse}) {

  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const posts = lang == "all" ? postsAllLang : postsOneLang
  const mounted = useMounted()
  if (!mounted) return <PostMainListPlaceholder/>

  return <PostCardList posts={posts} {...props} key={lang}></PostCardList>
}
