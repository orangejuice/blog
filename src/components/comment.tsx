"use client"
import React, {useEffect, useState} from "react"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"
import {useTranslation} from "react-i18next"
import {revalidator} from "@/lib/actions"
import {cn, useCssIndexCounter} from "@/lib/utils"
import {CommentPlaceholder} from "@/components/loading"
import {useGlobalState} from "@/lib/use-global-state"
import {useMounted} from "@/lib/use-mounted"


export const Comment = ({slug}: {slug: string}) => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const {i18n: {language: locale}} = useTranslation()
  const commentsTheme = resolvedTheme == "dark" ? darkTheme : lightTheme
  const [isLoaded, setIsLoaded] = useState(false)
  const cssIndexCounter = useCssIndexCounter()
  const [posts] = useGlobalState<Post[]>("post-data", [])
  const [discussion, setDiscussion] = useGlobalState<Discussion | undefined>("discussion", undefined)
  const mounted = useMounted()

  useEffect(() => {
    if (!mounted) return
    const bySlug = (item: {slug: string}) => item.slug == slug
    const post = posts.find(bySlug)
    if (post) setDiscussion(post.discussion)
  }, [mounted])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin != "https://giscus.app" || !event.data?.giscus) return
      if (event.data.giscus.resizeHeight > 100) setIsLoaded(true)
      if (event.data.giscus.error == "Discussion not found") setDiscussion({comment: 0, reaction: 0})
      const giscus: IDiscussionData = event.data.giscus.discussion
      if (!giscus) return
      setDiscussion({comment: giscus.totalCommentCount, reaction: giscus.reactionCount})
      if (!discussion) return
      if ((giscus.totalCommentCount != discussion.comment) || (giscus.reactionCount != discussion.reaction)) {
        void revalidator()
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (<>
    <div className="min-h-[350px]">
      {!isLoaded && <CommentPlaceholder className="h-0 mb-[350px]"/>}
      <div className={cn(isLoaded ? " animate-delay-in" : "h-px w-px fixed top-0 left-0 overflow-hidden")} style={cssIndexCounter()}>
        <GiscusComponent id={"comments"} {...props} theme={commentsTheme} lang={{en: "en", zh: "zh-CN"}[locale]}/>
      </div>
    </div>
  </>)
}
