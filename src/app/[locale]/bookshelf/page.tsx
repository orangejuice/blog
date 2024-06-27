import React, {Suspense} from "react"
import dayjs from "dayjs"
import {getActivityCalendarData} from "@/lib/fetch-activity"
import "./page.css"
import {ActivityCalendar} from "@/components/activity-calendar"
import {Icons} from "@/components/icons"

export default async function Page() {
  const calendarData = getActivityCalendarData(dayjs().subtract(1, "y"), dayjs())

  return (<>
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Media Tracker</h1>
      <Suspense fallback={<Icons.loading/>}>
        <ActivityCalendar calendarData={calendarData}/>
      </Suspense>
    </div>
  </>)
}
