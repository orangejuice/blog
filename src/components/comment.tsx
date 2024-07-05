"use client"
import React, {useEffect, useState} from "react"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import {revalidator} from "@/lib/actions"
import {cn, useCssIndexCounter} from "@/lib/utils"
import {CommentPlaceholder} from "@/components/loading"


export const Comment = ({slug}: {slug: string}) => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const {i18n: {language: locale}} = useTranslation()
  const commentsTheme = resolvedTheme === "dark" ? darkTheme : lightTheme
  const [interactions, setInteractions] = useLocalStorage<Interactions>("interaction", {})
  const [isLoaded, setIsLoaded] = useState(false)
  const cssIndexCounter = useCssIndexCounter()

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return
      console.log(event.data.giscus.resizeHeight)
      if (event.data.giscus.resizeHeight > 100) setIsLoaded(true)
      const discussion: IDiscussionData = event.data.giscus.discussion
      if (!discussion) return

      if (interactions.hasOwnProperty(slug) && interactions[slug] && (
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
  }, [interactions])

  return (<>
    <CommentPlaceholder className={cn("h-0", isLoaded && "hidden")}/>
    <div className={cn(isLoaded ? "animate-delay-in" : "h-px overflow-hidden")} style={cssIndexCounter()}>
      <GiscusComponent id={"comments"} {...props} theme={commentsTheme} lang={{
        en: "en",
        zh: "zh-CN"
      }[locale]}/>
    </div>
  </>)
}
