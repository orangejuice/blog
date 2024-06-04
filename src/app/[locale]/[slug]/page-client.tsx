"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import React, {useEffect} from "react"
import {useGlobalState} from "@/lib/hooks"
import {AnimatePresence, motion} from "framer-motion"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"
import {useTranslation} from "react-i18next"


export const Comments = ({slug}: {slug: string}) => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const {i18n: {language: locale}} = useTranslation()
  const [_, setInteractions] = useGlobalState("interactions")

  const commentsTheme = resolvedTheme === "dark" ? darkTheme : lightTheme
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return
      const discussion: IDiscussionData = event.data.giscus.discussion

      setInteractions(interactions => ({
        ...interactions,
        [slug]: {comment: discussion?.totalCommentCount ?? 0, reaction: discussion?.reactionCount ?? 0}
      }))
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [setInteractions, slug])

  return (
    <GiscusComponent id={"comments"} {...props} theme={commentsTheme} lang={{
      en: "en",
      zh: "zh-CN"
    }[locale]}/>
  )
}

export const Interactions = ({slug}: {slug: string}) => {
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
