"use client"
import {useLocalStorage} from "@/lib/use-local-storage"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {menu} from "@/site"
import {Icons} from "@/components/icons"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"
import {useMounted} from "@/lib/hooks"

export function LangSelect(props: ComponentPropsWithoutRef<"div">) {
  const [lang, setLang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const {t, i18n: {language: locale}} = useTranslation("lang")

  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <div {...props} className="flex items-center gap-1 animate-delay-in">
      <Icons.filter/>
      <Link href="" onClick={() => setLang("one")}
        className={cn("tracking-tight text-sm transition-all text-stone-600 underline-fade",
          "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
          lang != "all" ? "font-semibold" : "text-xs")}>
        {t(locale)}
      </Link>
      <Icons.symbol.slash className="-rotate-[30deg] w-3 h-3 -mx-1 stroke-2"/>
      <Link href="" onClick={() => setLang("all")}
        className={cn("tracking-tight text-sm transition-all text-stone-600 underline-fade",
          "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
          lang == "all" ? "font-semibold" : "text-xs")}>
        {t("all")}
      </Link>
    </div>
  </>)
}

export function ViewMore(props: ComponentPropsWithoutRef<"a">) {
  const {t, i18n: {language: locale}} = useTranslation()
  const [lang] = useLocalStorage<"one" | "all">("latest-lang", "one")

  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <Link {...props} href={lang == "all" ? `/${menu.posts}/all-lang` : `/${menu.posts}/${locale}`}
      className={cn("w-fit mx-auto flex items-center px-4 py-2 text-xs font-semibold duration-300 ease-out border rounded-full bg-neutral-900",
        "text-neutral-100 hover:border-neutral-700 border-neutral-900 hover:bg-white hover:text-neutral-900 animate-delay-in",
        "dark:bg-white dark:text-neutral-900 dark:hover:border-neutral-300 dark:hover:bg-black dark:hover:text-white")}>
      {t("post.view-more")}
      <Icons.link.chevron className="stroke-[.15rem]"/>
    </Link>
  </>)
}
