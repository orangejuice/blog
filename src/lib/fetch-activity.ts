"use server"
import {allActivities} from "contentlayer/generated"
import {eachDayInRange, format} from "@/lib/utils"
import dayjs, {Dayjs} from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import {unstable_cache as cache} from "next/cache"
import {FilterOption} from "@/components/activity-filter"
import {getMetadata, GetMetadataResponse} from "@/lib/fetch-db"

dayjs.extend(isBetween)

export const getActivities = cache(async (page: number, filter: FilterOption) => {
  let activities = allActivities
  if (Object.keys(filter).length > 0) {
    activities = activities.filter(act =>
      (!filter.status || act.status == filter.status) &&
      (!filter.category || act.category == filter.category) &&
      (!filter.year || dayjs(act.date).year() == +filter.year)
    )
  }

  let sortedActivities = activities.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)) as Activity[]
  const start = (page - 1) * 10
  const end = start + 10
  sortedActivities = sortedActivities.slice(start, end)

  const metadata: GetMetadataResponse = await getMetadata(sortedActivities.map(activity => activity.slug))
  sortedActivities.forEach(activity => activity.view = metadata[activity.slug]?.view ?? 0)
  return sortedActivities
})
export type ActivityWithMetadata = Activity & {view: number}
export type GetActivitiesResponse = ReturnType<typeof getActivities>


export const getActivity = cache(async (slug: string) => {
  return allActivities.find(activity => activity.slug == slug) as Activity
})


export const getActivitiesFilter = cache(async ({date, year}: {date?: string, year?: string} | undefined = {}) => {
  const counter = {
    book: {status: {todo: 0, doing: 0, done: 0}, total: 0},
    movie: {status: {todo: 0, doing: 0, done: 0}, total: 0},
    all: {status: {todo: 0, doing: 0, done: 0}, total: 0, year: {all: 0} as { [year in number | "all"]: number }}
  }
  allActivities.forEach(activity => {
    const curYear = dayjs(activity.date).year()
    if (!year || +year == curYear) {
      counter[activity.category].status[activity.status] += 1
      counter[activity.category].total += 1
      counter.all.status[activity.status] += 1
      counter.all.total += 1
    }
    if (!counter.all.year.hasOwnProperty(curYear)) counter.all.year[curYear] = 1
    else counter.all.year[curYear] += 1
    counter.all.year.all += 1
  })

  return counter
})
export type GetActivitiesFilterResponse = ReturnType<typeof getActivitiesFilter>


export const getActivityCalendarData = cache(async (startDate: Dayjs, endDate: Dayjs, filter: FilterOption) => {
  const activityMap = new Map<string, {total: number, book: number, movie: number}>()
  eachDayInRange(startDate, endDate).forEach(date => activityMap.set(format(date, {date: true}), {total: 0, book: 0, movie: 0}))

  for (const activity of allActivities) {
    const activityDate = dayjs(activity.date)
    if (filter.category && activity.category != filter.category) continue
    if (filter.status && activity.status != filter.status) continue

    if (activityDate.isBetween(startDate, endDate, "day", "[]")) {
      const dateString = format(activityDate, {date: true})
      const currentCount = activityMap.get(dateString)!
      currentCount.total += 1
      currentCount[activity.category] += 1
      activityMap.set(dateString, currentCount)
    }
  }

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

interface CalendarData {
  date: string
  count: number
  level: number
  countBook: number
  countMovie: number
}
