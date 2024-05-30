"use client"
import {useLocalStorage} from "@/lib/use-local-storage"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {menu} from "@/site"
import {Icons} from "@/components/icons"
import {FilterOption} from "@/components/post-filter"
import React, {ComponentPropsWithoutRef} from "react"
import {Post} from "contentlayer/generated"
import {PostItem} from "@/components/post"
import {useTranslation} from "react-i18next"
import {useMounted} from "@/lib/use-mounted"

export function LangSelect(props: ComponentPropsWithoutRef<"ul">) {
  const [lang, setLang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const {t, i18n: {language: locale}} = useTranslation("lang")
  const mounted = useMounted()
  if (!mounted) return null
  return (<>
    <ul {...props} className="flex h-14 items-center p-4 gap-1 animate-delay-in">
      <Icons.view/>
      <li className="relative">
        <Link href="" onClick={() => setLang("one")}
          className={cn("tracking-tight text-sm transition-all text-stone-600 underline-fade",
            "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
            lang != "all" ? "font-semibold" : "text-xs")}>
          {t(locale)}
        </Link>
      </li>
      <Icons.symbol.slash className="-rotate-[30deg] w-3 h-3 -mx-1 stroke-2"/>
      <li className="relative">
        <Link href="" onClick={() => setLang("all")}
          className={cn("tracking-tight text-sm transition-all text-stone-600 underline-fade",
            "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
            lang == "all" ? "font-semibold" : "text-xs")}>
          {t("all")}
        </Link></li>
    </ul>
  </>)
}


export function ViewMore(props: ComponentPropsWithoutRef<"a">) {
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")
  const mounted = useMounted()
  if (!mounted) return null
  return (<>
    <Link {...props} href={filter ? `/${menu.posts.path}/${filter.join("/")}` : `/${menu.posts.path}`}
      className={cn("w-fit mx-auto flex items-center px-4 py-2 mt-5 text-xs font-semibold duration-300 ease-out border rounded-full bg-neutral-900",
        "text-neutral-100 hover:border-neutral-700 border-neutral-900 hover:bg-white hover:text-neutral-900 animate-delay-in",
        "dark:bg-white dark:text-neutral-900 dark:hover:border-neutral-300 dark:hover:bg-black dark:hover:text-white")}>
      View more <Icons.link.chevron className="stroke-[.15rem]"/>
    </Link>
  </>)
}

export function PostList({postsOneLang, postsAllLang, ...props}:
  ComponentPropsWithoutRef<"ul"> & {postsOneLang: Post[], postsAllLang: Post[]}) {
  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const mounted = useMounted()
  if (!mounted) return null
  return lang == "all" ? (
    <ul className="flex flex-col gap-5 animate-delay-in" {...props} key={lang}>
      {postsAllLang.map(post => <li key={post.slug}><PostItem post={post}/></li>)}
    </ul>
  ) : (
    <ul className="flex flex-col gap-5 animate-delay-in" {...props} key={lang}>
      {postsOneLang.map(post => <li key={post.slug}><PostItem post={post}/></li>)}
    </ul>
  )
}