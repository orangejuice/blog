import {allActivities} from "contentlayer/generated"
import {eachDayInRange, format} from "@/lib/utils"
import dayjs, {Dayjs} from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

export const getActivities = () => {
  return allActivities.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

interface CalendarData {
  date: string
  count: number
  level: number
  countBook: number
  countMovie: number
}

export function getActivityCalendarData(startDate: Dayjs, endDate: Dayjs): CalendarData[] {
  const activityMap = new Map<string, {total: number, book: number, movie: number}>()

  eachDayInRange(startDate, endDate).forEach(date => {
    const dateString = format(date, {date: true})
    activityMap.set(dateString, {total: 0, book: 0, movie: 0})
  })

  allActivities.filter(act => ["book", "movie"].includes(act.category) && act.status == "done").forEach(activity => {
    const activityDate = dayjs(activity.date)
    if (activityDate.isBetween(startDate, endDate, "day", "[]")) {
      const dateString = activityDate.format("YYYY-MM-DD")
      const currentCount = activityMap.get(dateString)!
      currentCount.total += 1
      currentCount[activity.category as "book" | "movie"] += 1
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
    }
  })
}

export type CalendarActivity = CalendarData
