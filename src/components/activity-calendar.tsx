"use client"
import React, {cloneElement, ComponentPropsWithoutRef, forwardRef, use} from "react"
import {BlockElement, default as RawActivityCalendar} from "react-activity-calendar"
import {CalendarActivity, GetActivityCalendarDataResponse} from "@/lib/fetch-activity"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {format, useCssIndexCounter} from "@/lib/utils"
import {useTheme} from "next-themes"
import {useTranslation} from "react-i18next"
import "@/components/activity-calendar.css"
import {FilterOption} from "@/components/activity-filter"
import {CalendarPlaceholder} from "@/components/loading"

export function ActivityCalendar({calendarData, style, filter}: {calendarData: GetActivityCalendarDataResponse, filter: FilterOption & {start: string, end: string}} & ComponentPropsWithoutRef<"section">) {
  const data = use(calendarData)
  const {resolvedTheme} = useTheme()
  const {t, i18n: {language: locale}} = useTranslation()
  const cssIndexCounter = useCssIndexCounter(style)
  return (<>
    <section className="flex flex-col gap-2 min-h-52 animate-delay-in" style={cssIndexCounter()}>
      <h5 className="text-center text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">
        {t("bookshelf.calendar", {
          start: format(filter.start, {locale, localizeDate: true}),
          end: format(filter.end, {locale, localizeDate: true})
        })}
      </h5>
      <CalendarPlaceholder className="[&:has(~_article)]:hidden"/>
      <RawActivityCalendar data={data} showWeekdayLabels hideTotalCount hideColorLegend maxLevel={3}
        colorScheme={resolvedTheme as "light" | "dark"} style={{marginLeft: "auto", marginRight: "auto"}}
        // @ts-ignore
        renderBlock={(block, activity: CalendarActivity) => (<>
          <Tooltip delayDuration={300} disableHoverableContent>
            <TooltipTrigger asChild><DrawRect block={block} activity={activity}/></TooltipTrigger>
            <TooltipContent>
              {format(activity.date, {locale, localizeDate: true})}
              {!!activity.countBook && <p>{t("bookshelf.category.book")}: {activity.countBook}</p>}
              {!!activity.countMovie && <p>{t("bookshelf.category.movie")}: {activity.countMovie}</p>}
              {/*<TooltipArrow className="fill-white"/>*/}
            </TooltipContent>
          </Tooltip>
        </>)}/>
    </section>
  </>)
}

const DrawRect = forwardRef(function DrawRect({block, activity, ...props}: {block: BlockElement, activity: CalendarActivity}, ref) {
  const bookLevel = Math.min(activity.countBook, 3)
  const movieLevel = Math.min(activity.countMovie, 3)
  if (activity.countBook && activity.countMovie) {
    const id = "" + bookLevel + movieLevel
    return (<>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="46%" stopColor={`var(--color-book-${bookLevel})`}/>
          <stop offset="46%" stopColor={`var(--color-book-movie-sep)`}/>
          <stop offset="54%" stopColor={`var(--color-book-movie-sep)`}/>
          <stop offset="54%" stopColor={`var(--color-movie-${movieLevel})`}/>
        </linearGradient>
      </defs>
      {/* @ts-ignore*/}
      {cloneElement(block, {...props, fill: `url(#${id})`, ref})}
    </>)
  } else if (activity.countBook) {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, fill: `var(--color-book-${bookLevel})`, ref})
  } else if (activity.countMovie) {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, fill: `var(--color-movie-${movieLevel})`, ref})
  } else {
    {/* @ts-ignore*/}
    return cloneElement(block, {...props, ref})
  }
})
