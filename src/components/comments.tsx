"use client"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"

export const Comments = () => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const commentsTheme = resolvedTheme === "dark" ? darkTheme : lightTheme

  return (
    <GiscusComponent id={"comments-container"} {...props} theme={commentsTheme}/>
  )
}