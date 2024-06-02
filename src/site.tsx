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
  home: {name: "Home", path: "/"},
  posts: {name: "All posts", path: "all"},
  guestbook: {name: "Guestbook", path: "guestbook"}
}

export const giscusConfig: GiscusProps & {darkTheme: GiscusProps["theme"]} = {
  repo: "orangejuice/blog",
  repoId: "MDEwOlJlcG9zaXRvcnkyNzIyNTQ0MDA=",
  category: "Announcements",
  categoryId: "DIC_kwDOEDpFwM4CfqkE",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "top",
  theme: "light",
  darkTheme: "transparent_dark",
  loading: "eager"
}
