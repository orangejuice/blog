"use client"
import {ChangeEvent, useTransition} from "react"
import {site} from "@/site"
import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {useTranslation} from "react-i18next"

export function LocaleSwitcher() {
  const {t, i18n} = useTranslation("lang")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  let pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value

    pathname = i18n.language == site.locales[0] ? pathname : pathname.replace(`/${i18n.language}`, "")
    startTransition(async () => {
      await i18n.changeLanguage(nextLocale)
      router.replace(`/${nextLocale}${pathname}`)
    })
  }

  return (
    <label className={cn("relative", isPending && "transition-opacity [&:disabled]:opacity-30")}>
      <p className="sr-only">{t(i18n.language)}</p>
      <select className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        value={i18n.language} disabled={isPending} onChange={onSelectChange}>
        {site.locales.map((cur) => <option key={cur} value={cur}>{t(cur)}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  )
}
