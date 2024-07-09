"use client"
import {useLocalStorage} from "@/lib/use-local-storage"
import {cn} from "@/lib/utils"
import {Icon} from "@/components/ui/icon"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"
import {useMounted} from "@/lib/use-mounted"
import {Button} from "@/components/ui/button"

export function PostLangToggle(props: ComponentPropsWithoutRef<"button">) {
  const [lang, setLang] = useLocalStorage<"one" | "all">("latest-lang", "one")
  const {t, i18n: {language: locale}} = useTranslation("lang")

  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <Button variant="noStyle" onClick={() => setLang(prev => prev == "one" ? "all" : "one")}
      {...props} className="p-0 h-fit gap-1 animate-delay-in">
      <Icon.filter/>
      <span className={cn("tracking-tight text-sm transition-all text-stone-600",
        "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
        lang == "all" && "underline-fade", lang == "one" ? "font-semibold" : "text-xs")}>
        {t(locale)}
      </span>
      <Icon.symbol.slash className="-rotate-[30deg] w-3 h-3 -mx-1 stroke-2"/>
      <span className={cn("tracking-tight text-sm transition-all text-stone-600",
        "dark:text-stone-400 dark:hover:text-stone-300 dark:active:text-stone-200",
        lang == "one" && "underline-fade", lang == "all" ? "font-semibold" : "text-xs")}>
        {t("all")}
      </span>
    </Button>
  </>)
}
