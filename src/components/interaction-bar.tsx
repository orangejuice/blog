"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {AnimatePresence, motion} from "framer-motion"
import React, {useEffect} from "react"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useMounted} from "@/lib/use-mounted"
import {getViews, incrementViews} from "@/lib/actions"
import {useGlobalState} from "@/lib/use-global-state"

/**
 *  InteractionBar get data from different sources.
 *
 *  - for views/viewed, it gets the data from **localStorage**
 *    and its data are contained in the list query result, saved in the global state, retrieved while mounting InteractionBar
 *
 *  - for comments/reactions, it gets from **globalState**
 *   and its data are contained in the list query result, saved in the global state, retrieved while mounting Comment
 *
 * */
export const InteractionBar = ({slug, viewOnly = false}: {slug: string, viewOnly?: boolean}) => {
  const [posts] = useGlobalState<Post[]>("post-data", [])
  const [activities] = useGlobalState<Activity[]>("activity-data", [])
  const [interactions, setInteractions] = useLocalStorage<Interactions>("interaction", {})
  const [discussion] = useGlobalState<Discussion | undefined>("discussion", undefined)
  const mounted = useMounted()

  useEffect(() => {
    if (!mounted) return
    const bySlug = (item: {slug: string}) => item.slug == slug
    const post = posts.find(bySlug)
    if (post) {
      setInteractions(prev => ({
        ...prev,
        [slug]: {view: post.view, viewed: prev[slug]?.viewed}
      }))
    } else {
      const activity = activities.find(bySlug)
      if (activity) {
        setInteractions(prev => ({
          ...prev,
          [slug]: {view: activity.view, viewed: prev[slug]?.viewed}
        }))
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const updateViews = async (viewed: boolean) => {
      const updated = viewed ? await getViews(slug) : await incrementViews(slug)
      setInteractions(interactions => ({
        ...interactions,
        [slug]: {...interactions[slug], view: updated.view, viewed: true}
      }))
    }
    console.log(interactions[slug]?.viewed)
    if (interactions[slug]?.viewed) void updateViews(true)
    else void updateViews(false)
  }, [mounted])

  return (<>
    <div className="flex items-center gap-2 shrink-0">
      <span className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1")}>
        <Icons.post.view/>
        <AnimatePresence mode="popLayout">
          {mounted && interactions[slug]?.view != undefined &&
            <motion.span key={interactions[slug].view} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].view}</motion.span>}
          {(!mounted || interactions[slug]?.view == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
        </AnimatePresence>
      </span>
      {!viewOnly &&
        <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
          "hover:bg-stone-200 dark:hover:bg-stone-700")}>
          <Icons.post.reaction/>
          <AnimatePresence mode="popLayout">
            {mounted && discussion != undefined &&
              <motion.span key={discussion.reaction} animate={{opacity: 1}} exit={{opacity: 0}}>{discussion.reaction}</motion.span>}
            {(!mounted || discussion == undefined) &&
              <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
          </AnimatePresence>
        </Link>}
      {!viewOnly &&
        <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
          "hover:bg-stone-200 dark:hover:bg-stone-700")}>
          <Icons.post.comment/>
          <AnimatePresence mode="popLayout">
            {mounted && discussion != undefined &&
              <motion.span key={discussion.comment} animate={{opacity: 1}} exit={{opacity: 0}}>{discussion.comment}</motion.span>}
            {(!mounted || discussion == undefined) &&
              <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
          </AnimatePresence>
        </Link>}
    </div>
  </>)
}
