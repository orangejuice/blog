"use client"
import React, {useEffect} from "react"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig, menu} from "@/site"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import {revalidator} from "@/app/actions"


export const Comment = ({slug}: {slug: string}) => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const {i18n: {language: locale}} = useTranslation()
  const commentsTheme = resolvedTheme === "dark" ? darkTheme : lightTheme
  const [interactions, setInteractions] = useLocalStorage<Interactions>("interaction", {})

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return
      const discussion: IDiscussionData = event.data.giscus.discussion
      if (!discussion) return

      if (!(slug == menu.guestbook && !interactions.hasOwnProperty(slug)) && (
        (discussion.totalCommentCount != 0 && discussion.totalCommentCount != interactions[slug].discussion.comment)
        || (discussion.reactionCount != 0 && discussion.reactionCount != interactions[slug].discussion.reaction))) {
        void revalidator()
      }
      setInteractions(interact => ({
        ...interact,
        [slug]: {
          ...interact[slug],
          discussion: {comment: discussion.totalCommentCount, reaction: discussion.reactionCount}
        }
      }))
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [setInteractions, slug])

  return (<>
    <GiscusComponent id={"comments"} {...props} theme={commentsTheme} lang={{
      en: "en",
      zh: "zh-CN"
    }[locale]}/>
  </>)
}
