import React, {Suspense} from "react"
import dayjs from "dayjs"
import {getActivities, getActivitiesFilter, getActivityCalendarData} from "@/lib/fetch-activity"
import {ActivityCalendar} from "@/components/activity-calendar"
import {parseCatchAll, useCssIndexCounter} from "@/lib/utils"
import initTranslation from "@/lib/i18n"
import {SiteLocale} from "@/site"
import ActivityInfiniteScrollList from "@/components/activity-list"
import {ActivityFilter, FilterOption} from "@/components/activity-filter"
import {Metadata} from "next"
import {ActivitiesPlaceholder, CalendarPlaceholder} from "@/components/loading"

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const {t} = await initTranslation(locale)
  return {title: t("bookshelf.title")}
}

export default async function Page({params: {locale, filter}}: {params: {locale: SiteLocale, filter: string[]}}) {
  const appliedFilter = parseCatchAll(filter) as FilterOption
  const start = appliedFilter.year ? dayjs().year(+appliedFilter.year).startOf("y") : dayjs().subtract(1, "y").startOf("w")
  const end = appliedFilter.year ? dayjs().year(+appliedFilter.year).endOf("y") : dayjs()
  const calendarData = getActivityCalendarData(start, end, appliedFilter)
  const activityData = getActivities(1, appliedFilter)
  const filterData = getActivitiesFilter(appliedFilter)
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <Suspense fallback={<CalendarPlaceholder/>}>
      <ActivityCalendar calendarData={calendarData} filter={{start: start.toISOString(), end: end.toISOString(), ...appliedFilter}}/>
    </Suspense>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen mt-5">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter({mobile: 4})}>{t("bookshelf.title")}</h1>
          <p className="text-stone-600 dark:text-stone-400 animate-delay-in" style={cssIndexCounter()}>
            {t("bookshelf.description")}
          </p>
          <Suspense fallback={<ActivitiesPlaceholder/>}>
            <ActivityInfiniteScrollList data={activityData} style={cssIndexCounter()}/>
          </Suspense>
        </section>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        <ActivityFilter filter={appliedFilter} filterData={filterData} style={cssIndexCounter({mobile: 1})}/>
      </aside>
    </div>
  </>)
}
