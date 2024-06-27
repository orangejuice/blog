import {GiscusProps} from "@giscus/react"

export const site = {
  title: "Orangejuice blog",
  description: "Orange juice is a liquid extract of the orange tree fruit, it comes in several different varieties. (wiki)",
  author: "orangejuice",
  url: "https://orangejuice.cc",
  locales: ["en", "zh"]
} as const
export type SiteLocale = typeof site.locales[number]

export const menu = {
  home: "",
  post: "all",
  bookshelf: "bookshelf",
  guestbook: "guestbook"
} as const

export const giscusConfig: GiscusProps & {darkTheme: GiscusProps["theme"]} = {
  repo: "orangejuice/blog",
  repoId: "R_kgDOMEBKRA",
  category: "Announcements",
  categoryId: "DIC_kwDOMEBKRM4CfzhI",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "top",
  theme: "light",
  darkTheme: "transparent_dark",
  loading: "eager"
}
