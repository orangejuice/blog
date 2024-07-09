"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icon} from "@/components/ui/icon"
import {AnimatePresence, motion} from "framer-motion"
import React, {ComponentPropsWithoutRef, useEffect} from "react"
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
export const InteractionBar = ({slug, mini = false, className}: {slug: string, mini?: boolean} & ComponentPropsWithoutRef<"div">) => {
  const [posts, setPosts] = useGlobalState<Post[]>("post-data", [])
  const [activities, setActivities] = useGlobalState<Activity[]>("activity-data", [])
  const [interactions, setInteractions] = useLocalStorage<Interactions>("interaction", {})
  const [discussion] = useGlobalState<Discussion | undefined>("discussion", undefined)
  const bySlug = (item: {slug: string}) => item.slug == slug
  const mounted = useMounted()

  useEffect(() => {
    if (!mounted) return
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
      let index

      index = posts.findIndex(bySlug)
      if (index != -1) {
        posts[index].view = updated.view
        setPosts([...posts])
        return
      }

      index = activities.findIndex(bySlug)
      if (index != -1) {
        activities[index].view = updated.view
        setActivities([...activities])
      }
    }
    void updateViews(!!interactions[slug]?.viewed)
  }, [mounted])

  if (mini) return (<>
    <span className={cn("flex items-center rounded-md gap-1 transition text-xs", className)}>
      <Icon.post.viewFilled/>
      <AnimatePresence mode="popLayout">
        {mounted && interactions[slug]?.view != undefined &&
          <motion.span key={interactions[slug].view} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].view}</motion.span>}
        {(!mounted || interactions[slug]?.view == undefined) &&
          <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icon.loadingGrid/></motion.span>}
      </AnimatePresence>
    </span>
  </>)

  return (<>
    <div className="flex items-center gap-2 shrink-0">
      <span className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1")}>
        <Icon.post.view/>
        <AnimatePresence mode="popLayout">
          {mounted && interactions[slug]?.view != undefined &&
            <motion.span key={interactions[slug].view} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].view}</motion.span>}
          {(!mounted || interactions[slug]?.view == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icon.loadingGrid/></motion.span>}
        </AnimatePresence>
      </span>
      <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
        "hover:bg-stone-200 dark:hover:bg-stone-700")}>
        <Icon.post.reaction/>
        <AnimatePresence mode="popLayout">
          {mounted && discussion != undefined &&
            <motion.span key={discussion.reaction} animate={{opacity: 1}} exit={{opacity: 0}}>{discussion.reaction}</motion.span>}
          {(!mounted || discussion == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icon.loadingGrid/></motion.span>}
        </AnimatePresence>
      </Link>
      <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
        "hover:bg-stone-200 dark:hover:bg-stone-700")}>
        <Icon.post.comment/>
        <AnimatePresence mode="popLayout">
          {mounted && discussion != undefined &&
            <motion.span key={discussion.comment} animate={{opacity: 1}} exit={{opacity: 0}}>{discussion.comment}</motion.span>}
          {(!mounted || discussion == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icon.loadingGrid/></motion.span>}
        </AnimatePresence>
      </Link>
    </div>
  </>)
}
