"use client"
import {ChangeEvent, useTransition} from "react"
import {useLocale, useTranslations} from "next-intl"
import {site} from "@/site"
import {usePathname, useRouter} from "@/i18n"
import {cn} from "@/lib/utils"

export function LocaleSwitcher() {
  const t = useTranslations("lang")
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => router.replace(pathname, {locale: nextLocale}))
  }

  return (
    <label className={cn("relative", isPending && "transition-opacity [&:disabled]:opacity-30")}>
      <p className="sr-only">{t(locale)}</p>
      <select className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={locale} disabled={isPending} onChange={onSelectChange}>
        {site.locales.map((cur) => (
          <option key={cur} value={cur}>{t(cur)}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  )
}
