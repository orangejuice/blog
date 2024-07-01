"use client"
import React, {ComponentPropsWithoutRef, use, useEffect, useRef, useState, useTransition} from "react"
import type {Activity} from "contentlayer/generated"
import {cn, format, useCssIndexCounter} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import {Image} from "@/components/ui/image"
import {fetchActivities} from "@/lib/actions"
import {MDX} from "@/components/mdx"
import {Icons} from "@/components/icons"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption} from "@/components/activity-filter"
import {menu, site} from "@/site"
import Link from "next/link"


export default function ActivityInfiniteScrollList({data, style}: {data: Promise<Activity[]>} & ComponentPropsWithoutRef<"div">) {
  const [pages, setPages] = useState([1])
  const [activities, setActivities] = useState(use(data))
  const [hasMore, setHasMore] = useState(use(data).length == 10)
  const bottomRef = useRef(null)
  const [isPending, startTransition] = useTransition()
  const cssIndexCounter = useCssIndexCounter(style)
  const [filter] = useLocalStorage<FilterOption>("activity-filter", {})

  useEffect(() => {
    const bottom = bottomRef.current
    const option = {root: null, rootMargin: "20px", threshold: 0}
    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting && hasMore && !isPending && startTransition(async () => {
        const newPages = pages.concat(pages.slice(-1)[0] + 1)
        const newActivities = await fetchActivities(newPages, filter)
        setActivities(newActivities)
        setHasMore(newActivities.length === newPages.length * 10)
        setPages(newPages)
      })
    }, option)
    if (bottom) observer.observe(bottom)
    return () => {if (bottom) observer.unobserve(bottom)}
  }, [isPending, filter])

  return (<>
    <Activities activities={activities} style={cssIndexCounter()}/>
    <div ref={bottomRef} className="h-10 flex items-center justify-center animate-delay-in" style={cssIndexCounter()}>
      {isPending ? <Icons.loading/> : (!hasMore && "No more activities")}
    </div>
  </>)
}

const Activities = ({activities, style, className}: {activities: Activity[]} & ComponentPropsWithoutRef<"div">) => {
  const cssIndexCounter = useCssIndexCounter(style)
  const {t, i18n: {language: locale}} = useTranslation()

  return (<>
    <ul className={cn("space-y-6 py-8 animate-delay-in", className)} style={cssIndexCounter()}>
      {activities.map((activity) => {
        const Icon = Icons.type[`${activity.category}`]
        return (<>
          <li key={activity._id} className="flex flex-col gap-2 rounded-lg">
            <div className="flex flex-row items-start">
              <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
                <Image src={activity.cover} alt="cover"/>
              </div>
              <div className="flex flex-col grow text-stone-600 text-sm px-4 md:px-6">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-stone-800">{activity.title}</h2>
                  <div className="relative flex items-center gap-1 text-xs rounded-full font-medium text-stone-500">
                    <Icon/><span>{t(`bookshelf.category.${activity.category}`)}</span>
                  </div>
                </div>
                <StarRating rating={activity.douban?.rating}>
                  {!!activity.douban?.rating ? <>
                    <span className="ml-1 font-medium text-yellow-600 font-mono tracking-[-0.15em]">
                      {activity.douban?.rating?.toFixed(1)}
                    </span>
                  </> : <span className="ml-1 font-mono text-xs">{t("bookshelf.rating.0")}</span>}
                </StarRating>
                <p className="text-xs mt-0.5 mb-2">{activity.douban?.subtitle}</p>
                <MyComment activity={activity} className="hidden md:block"/>
              </div>
            </div>
            <MyComment activity={activity} className="block md:hidden"/>
          </li>
        </>)
      })}
    </ul>
  </>)
}

const MyComment = ({activity, className}: {activity: Activity} & ComponentPropsWithoutRef<"div">) => {
  const {t, i18n: {language: locale}} = useTranslation()

  return (<>
    <div className={cn("bg-stone-50 rounded-lg p-3 [&:has(.prose-sm:not(:empty))_>_div:first-child]:mb-2", className)}>
      <div className="flex items-center text-xs gap-2 text-stone-500">
        <span>{t(`bookshelf.${activity.category}.status.${activity.status}`, {date: format(activity.date, {locale, relativeWithDate: true})})}</span>
        {!!activity.rating && (<>
          <span className="text-stone-200 select-none">|</span>
          <StarRating rating={activity.rating} max={5} description/>
        </>)}
      </div>
      <MDX code={activity.body.code} className="prose-sm prose-p:mt-0 text-stone-800"/>
    </div>
  </>)
}

const StarRating = ({rating, max = 10, description = false, children}: {rating: number | undefined, max?: number, description?: boolean} & ComponentPropsWithoutRef<"div">) => {
  const {t} = useTranslation()
  rating ??= 0
  const ratingVal = rating * 10 / max
  const fullStars = Math.floor(ratingVal / 2)
  const hasHalfStar = ratingVal % 2 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const percentage = (ratingVal % 2) * 50

  return (
    <div className="flex items-center select-none">
      {description && <span className="mr-2 font-medium">{t(`bookshelf.rating.${rating}`)}</span>}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 dark:text-yellow-600">★</span>
      ))}
      {hasHalfStar && (
        <span className="relative">
          <span className="text-stone-300 dark:text-stone-600">★</span>
          <span className="absolute top-0 left-0 text-yellow-500 dark:text-yellow-600 overflow-hidden" style={{width: `${percentage}%`}}>
            ★
          </span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-stone-300 dark:text-stone-600">★</span>
      ))}
      {children}
    </div>
  )
}


export const LatestActivityList = ({data, style, className}: {data: Promise<Activity[]>} & ComponentPropsWithoutRef<"div">) => {
  const cssIndexCounter = useCssIndexCounter(style)
  const {t, i18n: {language: locale}} = useTranslation()
  const activities = use(data).slice(0, 2)

  return (<>
    <ul className={cn("space-y-6 animate-delay-in", className)} style={cssIndexCounter()}>
      {activities.map((activity) => (
        <li key={activity._id}>
          <Link href={`/${menu.bookshelf}`} className={cn("flex flex-col items-start px-4 py-2 rounded-md -mx-4 transition-colors gap-2",
            "hover:bg-stone-100 group dark:hover:bg-stone-800")}>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image src={site.avatar} alt="Avatar"/>
              </div>
              <div className="flex flex-col items-start text-stone-600 dark:text-stone-400">
                <span className="font-medium text-sm">{site.author}</span>
                <div className="flex items-center text-xs gap-2 line-clamp-1">
                  {t(`bookshelf.${activity.category}.status.${activity.status}`, {date: format(activity.date, {locale, relativeWithDate: true})})}
                  {!!activity.rating && (<>
                    <span className="text-stone-200 select-none">|</span>
                    <StarRating rating={activity.rating} max={5} description/>
                  </>)}
                </div>
              </div>
            </div>
            <span className="flex gap-1 text-sm">
              <MDX code={activity.body.code} className="prose-sm line-clamp-5 prose-p:mt-0 text-stone-800 dark:text-stone-400"/>
            </span>
            <div className="flex w-full rounded-lg p-3 group-hover:bg-stone-200 bg-stone-100 dark:bg-stone-800 dark:group-hover:bg-stone-700 dark:text-stone-400 transition-colors">
              <div className="relative w-14 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
                <Image src={activity.cover} alt="cover"/>
              </div>
              <div className="flex flex-col grow text-stone-600 text-sm px-4">
                <h2 className="font-bold text-stone-800 dark:text-stone-400">{activity.title}</h2>
                <StarRating rating={activity.douban?.rating}>
                  {!!activity.douban?.rating ? <>
                    <span className="ml-1 font-medium text-xs text-yellow-600 font-mono tracking-[-0.15em]">
                      {activity.douban?.rating?.toFixed(1)}
                    </span></> :
                    <span className="ml-1 font-mono text-xxs">
                      {t("bookshelf.rating.0")}
                    </span>}
                </StarRating>
                <p className="text-xxs mt-0.5 mb-2 line-clamp-2">{activity.douban?.subtitle}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </>)
}
