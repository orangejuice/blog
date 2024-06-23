"use client"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useMounted} from "@/lib/hooks"
import Link from "next/link"
import {menu} from "@/site"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"

export function ViewMore(props: ComponentPropsWithoutRef<"a">) {
  const {t, i18n: {language: locale}} = useTranslation()
  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")

  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <Link {...props} href={lang == "all" ? `/${menu.post}/all-lang` : `/${menu.post}/${locale}`}
      className={cn("w-fit mx-auto flex items-center px-4 py-2 text-xs font-semibold duration-300 ease-out border rounded-full bg-neutral-900",
        "text-neutral-100 hover:border-neutral-700 border-neutral-900 hover:bg-white hover:text-neutral-900 animate-delay-in",
        "dark:bg-white dark:text-neutral-900 dark:hover:border-neutral-300 dark:hover:bg-black dark:hover:text-white")}>
      {t("post.view-more")}
      <Icons.link.chevron className="stroke-[.15rem]"/>
    </Link>
  </>)
}
