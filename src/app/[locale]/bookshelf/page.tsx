import React, {Suspense} from "react"
import dayjs from "dayjs"
import {getActivities, getActivityCalendarData} from "@/lib/fetch-activity"
import {ActivityCalendar} from "@/components/activity-calendar"
import {Icons} from "@/components/icons"
import {useCssIndexCounter} from "@/lib/utils"
import initTranslation from "@/lib/i18n"
import {SiteLocale} from "@/site"
import ActivityList from "@/components/activity-list"

export default async function Page({params: {locale}}: {params: {locale: SiteLocale}}) {
  const calendarData = getActivityCalendarData(dayjs().subtract(1, "y").startOf("w"), dayjs())
  const activityData = getActivities(1)
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <div className="min-h-40">
      <Suspense fallback={<Icons.loading/>}>
        <ActivityCalendar calendarData={calendarData}/>
      </Suspense>
    </div>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("bookshelf.title")}</h1>
          <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
            {t("bookshelf.description")}
          </p>
          <Suspense fallback={<Icons.loading/>}>
            <ActivityList data={activityData}/>
          </Suspense>
        </section>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        right
      </aside>
    </div>
  </>)
}
