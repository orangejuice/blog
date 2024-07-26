"use client"
import {GetLocalesResponse, GetTagsResponse} from "@/lib/fetch"
import {cn, objectToUrlPart, useCssIndexCounter} from "@/lib/utils"
import {Icon} from "@/components/ui/icon"
import React, {use, useEffect} from "react"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useTranslation} from "react-i18next"
import Link from "next/link"
import {menu, SiteLocale} from "@/site"


export type FilterOption = {lang?: SiteLocale | "all-lang", tag?: string}

export function PostFilter({locales: localesData, tags: tagsData, filter: applied, style}: {locales: GetLocalesResponse, tags: GetTagsResponse, filter: FilterOption, style?: React.CSSProperties}) {
  const locales = use(localesData)
  const tags = use(tagsData)
  const cssIndexCounter = useCssIndexCounter(style)
  const {t, i18n: {language: locale}} = useTranslation()
  const [, setFilter] = useLocalStorage<FilterOption>("post-filter", applied)
  useEffect(() => {applied && setFilter(applied)}, [applied, setFilter])

  return (<>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("post.filter.languages")}</h5>
      <div className="flex flex-wrap text-stone-600 dark:text-stone-400">
        {Object.entries(locales).map(([lang, num], index) => (
          <Link key={index} href={`/${menu.post}/${objectToUrlPart({lang})}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              lang == applied.lang && "underline-fade-selected font-bold")}>
            <Icon.symbol.hash/>{t(lang, {ns: "lang"})} ({num})
          </Link>
        ))}
      </div>
    </section>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("post.filter.tags")}</h5>
      <div className="flex flex-wrap text-stone-600 dark:text-stone-400">
        {Object.entries(tags).map(([tag, num], index) => (
          <Link key={index} href={`/${menu.post}/${objectToUrlPart({lang: applied.lang, tag: tag == applied.tag ? undefined : tag})}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              tag == applied.tag && "underline-fade-selected font-bold")}>
            <Icon.symbol.hash/>{t(tag, {ns: "tag"})} ({num})
          </Link>
        ))}
      </div>
    </section>
  </>)
}
