"use client"
import {useLocalStorage} from "@/lib/use-local-storage"
import Link from "next/link"
import {cn} from "@/lib/utils"
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
