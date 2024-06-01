"use client"
import {ChangeEvent, useTransition} from "react"
import {site} from "@/site"
import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {useTranslation} from "react-i18next"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button"

export function LocaleSwitcher() {
  const {t, i18n} = useTranslation("lang")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  let pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value

    pathname = i18n.language == site.locales[0] ? pathname : pathname.replace(`/${i18n.language}`, "")
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname}`)
      router.refresh()
    })
  }

  return (
    <label className={cn("relative flex items-center pl-3", isPending && "transition-opacity [&:disabled]:opacity-30")}>
      <p className="sr-only">{t(i18n.language)}</p>
      <Icons.nav.lang className="z-10 pointer-events-none"/>
      <select className={cn(buttonVariants({variant: "ghost", size: "icon"}),
        "appearance-none pl-8 pr-3 -ml-7 cursor-pointer select-none text-center",
        "h-fit w-fit whitespace-nowrap rounded-lg py-1.5 transition-all",
        "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      )} value={i18n.language} disabled={isPending} onChange={onSelectChange}>
        {site.locales.map((cur) => <option key={cur} value={cur}>{t(cur, {lng: cur})}</option>)}
      </select>
    </label>
  )
}
