"use client"
import {cn, objectToUrlPart, useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"
import React, {use, useEffect} from "react"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useTranslation} from "react-i18next"
import Link from "next/link"
import {menu} from "@/site"
import {Activity} from "contentlayer/generated"
import {GetActivitiesFilterResponse} from "@/lib/fetch-activity"


export type FilterOption = {category: Activity["category"], status: Activity["status"], year: string}

export function ActivityFilter({filter: applied, style, filterData}: {filter: FilterOption, style?: React.CSSProperties, filterData: GetActivitiesFilterResponse}) {
  const cssIndexCounter = useCssIndexCounter(style)
  const filter = use(filterData)
  const {t, i18n: {language: locale}} = useTranslation()
  const [, setFilter] = useLocalStorage<FilterOption>("activity-filter", applied)
  useEffect(() => {applied && setFilter(applied) }, [applied, setFilter])
  const selectedCate = applied.category || "all"
  const selectedYear = applied.year || "all"
  return (<>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("bookshelf.filter.year")}</h5>
      <div className="flex flex-wrap text-stone-600">
        {Object.entries(filter.all.year).map(([year, num], index) => (
          <Link key={index} href={`/${menu.bookshelf}/${objectToUrlPart({year})}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              year == selectedYear && "underline-fade-selected font-bold")}>
            <Icons.symbol.hash/>{year == "all" ? t(`bookshelf.filter.category.all`) : year} ({num})
          </Link>
        ))}
      </div>
    </section>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("bookshelf.filter.category")}</h5>
      <div className="flex flex-wrap text-stone-600">
        {Object.entries(filter).map(([category, {total}], index) => (
          <Link key={index} href={`/${menu.bookshelf}/${objectToUrlPart({year: applied.year, category})}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              (category == selectedCate) && "underline-fade-selected font-bold")}>
            <Icons.symbol.hash/>{t(`bookshelf.filter.category.${category}`)} ({total})
          </Link>
        ))}
      </div>
    </section>
    <section className="animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">{t("bookshelf.filter.status")}</h5>
      <div className="flex flex-wrap text-stone-600">
        {Object.entries(filter[selectedCate].status).map(([status, num], index) => (
          <Link key={index} href={`/${menu.bookshelf}/${objectToUrlPart({...applied, status})}`}
            className={cn("flex items-center group m-2 text-sm font-medium underline-fade",
              status == applied.status && "underline-fade-selected font-bold")}>
            <Icons.symbol.hash/>{t(`bookshelf.filter.status.${status}`)} ({num})
          </Link>
        ))}
      </div>
    </section>
  </>)
}
