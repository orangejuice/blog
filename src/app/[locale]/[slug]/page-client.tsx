"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import React from "react"
import {useGlobalState} from "@/lib/hooks"
import {AnimatePresence, motion} from "framer-motion"

export const Interactions = ({slug}: {slug: string}) => {
  const [interactions] = useGlobalState("interactions")

  return (<>
    <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
      "hover:bg-stone-200 dark:hover:bg-stone-700")}>
      <Icons.post.reaction/>
      <AnimatePresence mode="popLayout">
        {interactions[slug]?.reaction &&
          <motion.span key="num" animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug]?.reaction}</motion.span>}
        {!interactions[slug]?.reaction &&
          <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.grid/></motion.span>}
      </AnimatePresence>
    </Link>
    <Link href={"#comments"} className={cn("flex items-center rounded-md gap-1 transition px-1 py-0.5 text-sm -mx-1",
      "hover:bg-stone-200 dark:hover:bg-stone-700")}>
      <Icons.post.comment/>
      <AnimatePresence mode="popLayout">
        {interactions[slug]?.comment &&
          <motion.span key="num" animate={{opacity: 1}} exit={{opacity: 0}}>{interactions[slug]?.comment}</motion.span>}
        {!interactions[slug]?.comment &&
          <motion.span key="load" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.grid/></motion.span>}
      </AnimatePresence>
    </Link>
  </>)
}
