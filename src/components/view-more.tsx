"use client"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import Link from "next/link"
import {menu} from "@/site"
import {cn, objectToUrlPart} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {FilterOption} from "@/components/post-filter"
import {useMounted} from "@/lib/use-mounted"
import {buttonVariants} from "@/components/ui/button"

export function ViewMore(props: ComponentPropsWithoutRef<"a">) {
  const {t, i18n: {language: locale}} = useTranslation()
  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const filterOption = {lang: lang == "all" ? "all-lang" : locale} as FilterOption

  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <Link {...props} href={`/${menu.post}/${objectToUrlPart(filterOption)}`}
      className={cn(buttonVariants(), "w-fit h-fit mx-auto flex items-center px-4 py-2 text-xs font-semibold border rounded-full",
        "bg-stone-900 text-stone-100 hover:border-stone-700 border-stone-900 hover:bg-white hover:text-stone-900")}>
      {t("post.view-more")}
      <Icons.link.chevron className="stroke-[.15rem] -mr-2"/>
    </Link>
  </>)
}
