"use client"
import React, {cloneElement, ComponentPropsWithoutRef, forwardRef, use} from "react"
import {BlockElement, default as RawActivityCalendar} from "react-activity-calendar"
import {CalendarActivity, GetActivityCalendarDataResponse} from "@/lib/fetch-activity"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {cn, format, useCssIndexCounter} from "@/lib/utils"
import {useTheme} from "next-themes"
import {useTranslation} from "react-i18next"
import {FilterOption} from "@/app/[locale]/bookshelf/[[...filter]]/filter"
import {CalendarPlaceholder} from "@/components/loading"
import {Icon} from "@/components/ui/icon"

export function ActivityCalendar({calendarData, style, filter}: {calendarData: GetActivityCalendarDataResponse, filter: FilterOption & {start: string, end: string}} & ComponentPropsWithoutRef<"section">) {
  const data = use(calendarData)
  const {resolvedTheme} = useTheme()
  const {t, i18n: {language: locale}} = useTranslation()
  const cssIndexCounter = useCssIndexCounter(style)
  return (<>
    <section className={cn("flex flex-col items-center gap-2 animate-delay-in",
      "[&_.react-activity-calendar\\_\\_scroll-container]:pb-[8px]")}
      style={cssIndexCounter()}>
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">
        {t("bookshelf.calendar", {
          start: format(filter.start, {locale, localizeDate: true}),
          end: format(filter.end, {locale, localizeDate: true})
        })}
      </h5>
      <CalendarPlaceholder className="h-[130px] [&:has(~_article)]:hidden" bodyOnly/>
      <RawActivityCalendar data={data} showWeekdayLabels hideTotalCount hideColorLegend maxLevel={3}
        colorScheme={resolvedTheme as "light" | "dark"}
        // @ts-ignore
        renderBlock={(block, activity: CalendarActivity) => (<>
          <Tooltip delayDuration={300} disableHoverableContent>
            <TooltipTrigger asChild><DrawRect block={block} activity={activity}/></TooltipTrigger>
            <TooltipContent className="space-y-1 px-3 py-2">
              <p className="text-xs">{format(activity.date, {locale, localizeDate: true})}</p>
              {(!!activity.countBook || !!activity.countMovie) &&
                <p className="flex items-center gap-1 font-medium text-stone-800 dark:text-stone-200">
                  {!!activity.countBook && <><Icon.type.book/> {activity.countBook}</>}
                  {!!activity.countMovie && <><Icon.type.movie/> {activity.countMovie}</>}
                </p>}
            </TooltipContent>
          </Tooltip>
        </>)}/>
      <ColorLegend/>
    </section>
  </>)
}

const ColorLegend = () => {
  const {t} = useTranslation()

  const unit = ([category, level]: readonly ["Book" | "Movie", number], index: number) => (
    <svg width="12" height="12" className="shrink-0" key={index}>
      <DrawRect block={<rect x="0" y="0" width="12" height="12" rx="2" ry="2"/>}
        activity={{[`count${category}`]: level} as unknown as CalendarActivity}/>
    </svg>
  )

  return (<>
    <div className="flex items-center gap-2 text-xs self-end">
      {t(`bookshelf.category.book`)}
      {([["Book", 1], ["Book", 2], ["Book", 3]] as const).map(unit)}
      <span className="px-2"/>
      {t(`bookshelf.category.movie`)}
      {([["Movie", 1], ["Movie", 2], ["Movie", 3]] as const).map(unit)}
    </div>
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
          <stop offset="50%" stopColor={`var(--color-book-${bookLevel})`}/>
          <stop offset="50%" stopColor={`var(--color-movie-${movieLevel})`}/>
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
