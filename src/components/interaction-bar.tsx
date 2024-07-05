"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {AnimatePresence, motion} from "framer-motion"
import React, {useEffect} from "react"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useMounted} from "@/lib/use-mounted"
import {incrementViews} from "@/lib/actions"

export const InteractionBar = ({slug}: {slug: string}) => {
  const [interactions, setInteractions] = useLocalStorage<Interactions>("interaction", {})
  const mounted = useMounted()

  useEffect(() => {
    if (!mounted) return
    const updateViews = async () => {
      const updated = await incrementViews(slug)
      setInteractions(interactions => ({
        ...interactions,
        [slug]: {...interactions[slug], view: updated.view, viewed: true}
      }))
    }
    if (!interactions[slug]?.viewed) void updateViews()
  }, [mounted])

  return (<>
    <div className="flex items-center gap-2 shrink-0">
      <span className={cn("flex items-center cursor-default rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1")}>
        <Icons.post.view/>
        <AnimatePresence mode="popLayout">
          {mounted && interactions[slug]?.view != undefined &&
            <motion.span key={interactions[slug].view} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].view}</motion.span>}
          {(!mounted || interactions[slug]?.view == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
        </AnimatePresence>
      </span>
      <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
        "hover:bg-stone-200 dark:hover:bg-stone-700")}>
        <Icons.post.reaction/>
        <AnimatePresence mode="popLayout">
          {mounted && interactions[slug]?.discussion != undefined &&
            <motion.span key={interactions[slug].discussion.reaction} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].discussion.reaction}</motion.span>}
          {(!mounted || interactions[slug]?.discussion == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
        </AnimatePresence>
      </Link>
      <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
        "hover:bg-stone-200 dark:hover:bg-stone-700")}>
        <Icons.post.comment/>
        <AnimatePresence mode="popLayout">
          {mounted && interactions[slug]?.discussion != undefined &&
            <motion.span key={interactions[slug].discussion.comment} animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].discussion.comment}</motion.span>}
          {(!mounted || interactions[slug]?.discussion == undefined) &&
            <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loadingGrid/></motion.span>}
        </AnimatePresence>
      </Link>
    </div>
  </>)
}
