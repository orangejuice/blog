"use client"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import Link from "next/link"
import {menu} from "@/site"
import {cn, objectToUrlPart} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {FilterOption} from "@/components/post-filter"

export function ViewMore(props: ComponentPropsWithoutRef<"a">) {
  const {t, i18n: {language: locale}} = useTranslation()
  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const filterOption = {lang: lang == "all" ? "all-lang" : locale} as FilterOption
  return (<>
    <Link {...props} href={`/${menu.post}/${objectToUrlPart(filterOption)}`}
      className={cn("w-fit mx-auto flex items-center px-4 py-2 text-xs font-semibold duration-300 ease-out border rounded-full bg-neutral-900",
        "text-neutral-100 hover:border-neutral-700 border-neutral-900 hover:bg-white hover:text-neutral-900 animate-delay-in",
        "dark:bg-white dark:text-neutral-900 dark:hover:border-neutral-300 dark:hover:bg-black dark:hover:text-white")}>
      {t("post.view-more")}
      <Icons.link.chevron className="stroke-[.15rem]"/>
    </Link>
  </>)
}
