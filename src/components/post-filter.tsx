"use client"
import {GetLocalesResponse, GetTagsResponse} from "@/lib/fetch"
import {Link} from "@/i18n"
import {cn, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import React, {useEffect} from "react"
import {useLocale, useTranslations} from "next-intl"
import {LangOption, SiteLocale} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"

export type FilterOption = [LangOption, string]

export function PostFilter({locales, tags, filter: appliedFilter}: {locales: GetLocalesResponse, tags: GetTagsResponse, filter: FilterOption}) {
  const cssIndexCounter = useCssIndexCounter()
  const t = useTranslations("lang")
  const locale = useLocale() as SiteLocale
  const [, setFilter] = useLocalStorage<FilterOption | "">("post-filter", appliedFilter ?? "")
  useEffect(() => {appliedFilter && setFilter(appliedFilter) }, [appliedFilter])

  return (<>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Languages</h5>
      <div className="flex flex-wrap text-stone-600">
        {Object.entries(locales).map(([lang, num], index) => (
          <Link key={index} href={`/all/${lang}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              lang == (appliedFilter?.[0] ?? locale) && "underline-fade-selected font-bold")}>
            <Icons.symbol.hash/>{t(lang)} ({num})
          </Link>
        ))}
      </div>
    </section>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Tags</h5>
      <div className="flex flex-wrap text-stone-600">
        {Object.entries(tags).map(([tag, num], index) => (
          <Link key={index} href={`/all/${appliedFilter?.[0] ?? locale}/${tag}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              tag == (appliedFilter?.[1] ? decodeURI(appliedFilter?.[1]) : undefined) && "underline-fade-selected font-bold")}>
            <Icons.symbol.hash/>{tag} ({num})
          </Link>
        ))}
      </div>
    </section>
  </>)
}