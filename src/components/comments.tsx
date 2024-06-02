"use client"
import GiscusComponent from "@giscus/react"
import {useTheme} from "next-themes"
import {giscusConfig} from "@/site"
import {useTranslation} from "react-i18next"

export const Comments = () => {
  const {theme: lightTheme, darkTheme, ...props} = giscusConfig
  const {resolvedTheme} = useTheme()
  const {i18n: {language: locale}} = useTranslation()

  const commentsTheme = resolvedTheme === "dark" ? darkTheme : lightTheme

  return (
    <GiscusComponent id={"comments"} {...props} theme={commentsTheme} lang={{
      en: "en",
      zh: "zh-CN"
    }[locale]}/>
  )
}