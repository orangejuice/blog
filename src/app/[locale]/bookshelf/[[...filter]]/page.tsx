import React, {Suspense} from "react"
import dayjs from "dayjs"
import {getActivities, getActivitiesFilter, getActivityCalendarData} from "@/lib/fetch-activity"
import {ActivityCalendar} from "@/components/activity-calendar"
import {Icons} from "@/components/icons"
import {parseCatchAll, useCssIndexCounter} from "@/lib/utils"
import initTranslation from "@/lib/i18n"
import {SiteLocale} from "@/site"
import ActivityList from "@/components/activity-list"
import {ActivityFilter, FilterOption} from "@/components/activity-filter"

export default async function Page({params: {locale, filter}}: {params: {locale: SiteLocale, filter: string[]}}) {
  const appliedFilter = parseCatchAll(filter) as FilterOption
  const calendarData = getActivityCalendarData(
    appliedFilter.year ? dayjs().year(+appliedFilter.year).startOf("y") : dayjs().subtract(1, "y").startOf("w"),
    appliedFilter.year ? dayjs().year(+appliedFilter.year).endOf("y") : dayjs())
  const activityData = getActivities(1, appliedFilter)
  const filterData = getActivitiesFilter(appliedFilter)
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <Suspense fallback={<Icons.loading/>}>
      <ActivityCalendar calendarData={calendarData}/>
    </Suspense>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("bookshelf.title")}</h1>
          <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
            {t("bookshelf.description")}
          </p>
          <Suspense fallback={<Icons.loading/>}>
            <ActivityList data={activityData} style={cssIndexCounter()}/>
          </Suspense>
        </section>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        <Suspense fallback={<Icons.loading/>}>
          <ActivityFilter filter={appliedFilter} filterData={filterData} style={cssIndexCounter()}/>
        </Suspense>
      </aside>
    </div>
  </>)
}
