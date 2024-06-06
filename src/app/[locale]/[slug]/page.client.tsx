"use client"
import {useGlobalState} from "@/lib/hooks"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {AnimatePresence, motion} from "framer-motion"
import React from "react"

export const InteractionBar = ({slug}: {slug: string}) => {
  const [interactions] = useGlobalState("interactions")

  return (<>
    <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
      "hover:bg-stone-200 dark:hover:bg-stone-700")}>
      <Icons.post.reaction/>
      <AnimatePresence mode="popLayout">
        {interactions[slug] != undefined &&
          <motion.span key="num" animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].reaction}</motion.span>}
        {interactions[slug] == undefined &&
          <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.grid/></motion.span>}
      </AnimatePresence>
    </Link>
    <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
      "hover:bg-stone-200 dark:hover:bg-stone-700")}>
      <Icons.post.comment/>
      <AnimatePresence mode="popLayout">
        {interactions[slug] != undefined &&
          <motion.span key="num" animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug].comment}</motion.span>}
        {interactions[slug] == undefined &&
          <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.grid/></motion.span>}
      </AnimatePresence>
    </Link>
  </>)
}
