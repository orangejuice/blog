"use client"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"
import {useTranslation} from "react-i18next"
import {useEffect} from "react"
import {useGlobalState} from "@/lib/hooks"

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
      if (!discussion) return
      setInteractions(interactions => ({
        ...interactions,
        [slug]: {comment: discussion.totalCommentCount, reaction: discussion.reactionCount}
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