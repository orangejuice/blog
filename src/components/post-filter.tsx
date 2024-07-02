"use client"
import {GetLocalesResponse, GetTagsResponse} from "@/lib/fetch"
import {cn, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import React, {useEffect} from "react"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useTranslation} from "react-i18next"
import Link from "next/link"
import {SiteLocale} from "@/site"

export type FilterOption = [SiteLocale | "all-lang", string]

export function PostFilter({locales, tags, filter: appliedFilter, style}: {locales: GetLocalesResponse, tags: GetTagsResponse, filter: FilterOption, style?: React.CSSProperties}) {
  const cssIndexCounter = useCssIndexCounter(style)
  const {t, i18n: {language: locale}} = useTranslation("lang")
  const [, setFilter] = useLocalStorage<FilterOption | "">("post-filter", appliedFilter ?? "")
  useEffect(() => {appliedFilter && setFilter(appliedFilter) }, [appliedFilter, setFilter])

  return (<>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("post.filter.languages")}</h5>
      <div className="flex flex-wrap text-stone-600 dark:text-stone-400">
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
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("post.filter.tags")}</h5>
      <div className="flex flex-wrap text-stone-600 dark:text-stone-400">
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
