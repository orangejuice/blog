"use client"
import React, {cloneElement, forwardRef} from "react"
import ActivityCalendar, {BlockElement} from "react-activity-calendar"
import {format} from "@/lib/utils"
import dayjs from "dayjs"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {useTheme} from "next-themes"
import {useTranslation} from "react-i18next"
import {useMounted} from "@/lib/hooks"
import {CalendarActivity, getActivityCalendarData} from "@/lib/fetch-activity"
import "./page.css"

export default function Page() {
  const {resolvedTheme} = useTheme()
  const {t, i18n: {language: locale}} = useTranslation()
  const mounted = useMounted()
  if (!mounted) return null

  const calendarData = getActivityCalendarData(dayjs().subtract(1, "y"), dayjs())

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Media Tracker</h1>

      <ActivityCalendar data={calendarData} showWeekdayLabels hideTotalCount hideColorLegend maxLevel={3}
        colorScheme={resolvedTheme as "light" | "dark"}
        renderBlock={(block, activity) => (
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild><DrawRect block={block} activity={activity as unknown as CalendarActivity}/></TooltipTrigger>
            <TooltipContent>{format(activity.date, {locale})} <p>{JSON.stringify(activity)}</p></TooltipContent>
          </Tooltip>
        )}/>
    </div>
  )
}


const DrawRect = forwardRef(function DrawRect({block, activity, ...props}: {block: BlockElement, activity: CalendarActivity}, ref) {
  const bookLevel = Math.min(activity.countBook, 3)
  const movieLevel = Math.min(activity.countMovie, 3)
  if (activity.countBook && activity.countMovie) {
    const id = "" + bookLevel + movieLevel
    return (<>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="49%" stopColor={`var(--color-book-${bookLevel})`}/>
          <stop offset="49%" stopColor={`var(--color-book-movie-sep)`}/>
          <stop offset="51%" stopColor={`var(--color-movie-${movieLevel})`}/>
        </linearGradient>
      </defs>
      {/* @ts-ignore*/}
      {cloneElement(block, {...props, fill: `url(#${id})`, ref})}
    </>)
  } else if (activity.countBook) {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, fill: `var(--color-book-${bookLevel})`}, ref)
  } else if (activity.countMovie) {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, fill: `var(--color-movie-${movieLevel})`}, ref)
  } else {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, ref})
  }
})
