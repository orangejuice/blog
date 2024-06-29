"use server"
import {allActivities} from "contentlayer/generated"
import {eachDayInRange, format} from "@/lib/utils"
import dayjs, {Dayjs} from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import {unstable_cache as cache} from "next/cache"

dayjs.extend(isBetween)

export const getActivities = cache(async (page: number) => {
  const sortedActivities = allActivities.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  const start = (page - 1) * 10
  const end = start + 10
  return sortedActivities.slice(start, end)
})

interface CalendarData {
  date: string
  count: number
  level: number
  countBook: number
  countMovie: number
}

export const getActivityCalendarData = cache(async (startDate: Dayjs, endDate: Dayjs) => {
  const activityMap = new Map<string, {total: number, book: number, movie: number}>()
  eachDayInRange(startDate, endDate).forEach(date => activityMap.set(format(date, {date: true}), {total: 0, book: 0, movie: 0}))

  allActivities.filter(act => act.status == "done").forEach(activity => {
    const activityDate = dayjs(activity.date)
    if (activityDate.isBetween(startDate, endDate, "day", "[]")) {
      const dateString = format(activityDate, {date: true})
      const currentCount = activityMap.get(dateString)!
      currentCount.total += 1
      currentCount[activity.category] += 1
      activityMap.set(dateString, currentCount)
    }
  })

  return Array.from(activityMap.entries()).map(([date, counts]) => {
    const level = Math.min(Math.ceil(counts.total), 3)
    return {
      date,
      count: counts.total,
      level,
      countBook: counts.book,
      countMovie: counts.movie
    } as CalendarData
  })
})

export type CalendarActivity = CalendarData
export type GetActivityCalendarDataResponse = ReturnType<typeof getActivityCalendarData>
