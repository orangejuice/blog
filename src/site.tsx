import {GiscusProps} from "@giscus/react"

export const site = {
  title: "Orangejuice blog",
  description: "This is a description",
  author: "orangejuice",
  locales: ["en", "zh"] as const
}

export type SiteLocale = typeof site.locales[number]
export type LangOption = SiteLocale | "all-lang"

export const menu = {
  home: "/",
  posts: "all",
  guestbook: "guestbook"
}

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
