"use client"
import React, {ComponentPropsWithoutRef, use, useEffect, useTransition} from "react"
import type {Activity} from "contentlayer/generated"
import {cn, format, useCssIndexCounter} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import {Image} from "@/components/ui/image"
import {fetchActivities} from "@/lib/actions"
import {MDX} from "@/components/mdx"
import {Icon} from "@/components/ui/icon"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption} from "@/components/activity-filter"
import {menu, site, SiteLocale} from "@/site"
import Link from "next/link"
import {Divider} from "@/components/ui/divider"
import {useGlobalState} from "@/lib/use-global-state"
import {usePathname} from "next/navigation"
import {BounceBackground} from "@/components/generic"
import {GetActivitiesResponse} from "@/lib/fetch-activity"
import {StarRating} from "@/components/star-rating"
import {Button} from "@/components/ui/button"


export default function ActivityInfiniteScrollList({data: firstPage, style}: {data: GetActivitiesResponse} & ComponentPropsWithoutRef<"div">) {
  const pathname = usePathname()
  const data = use(firstPage)
  const [state, setState] = useGlobalState("activity", {
    key: pathname, page: 1, hasMore: data.length == 10
  })
  const [activities, setActivities] = useGlobalState("activity-data", data)
  const [isPending, startTransition] = useTransition()
  const cssIndexCounter = useCssIndexCounter(style)
  const [filter] = useLocalStorage<FilterOption>("activity-filter", {})
  const {t, i18n: {language: locale}} = useTranslation()

  useEffect(() => {
    if (pathname == state.key) return
    setState({key: pathname, page: 1, hasMore: data.length == 10})
    setActivities(data)
  }, [])

  const loadMore = () => startTransition(async () => {
    const newActivities = await fetchActivities({page: state.page + 1, filter, locale: locale as SiteLocale})
    setState(({key: state.key, page: state.page + 1, hasMore: newActivities.length == 10}))
    setActivities(activities.concat(...newActivities))
  })

  return (<>
    <Activities activities={activities} style={cssIndexCounter()}/>
    <div className="flex items-center justify-center">
      {state.hasMore && <>
        <Button disabled={isPending} onClick={loadMore} className={cn("w-fit h-fit gap-1 flex items-center px-4 py-2 text-xs font-semibold border rounded-full",
          "bg-stone-900 text-stone-100 hover:border-stone-700 border-stone-900 hover:bg-white hover:text-stone-900 animate-delay-in disabled:bg-stone-500 disabled:border-stone-500")}>
          {isPending && <><Icon.loading className="w-4 h-4"/>{t("generic.loading")}</>}
          {!isPending && t("generic.load-more")}
        </Button>
      </>}
      {!state.hasMore && <Divider text={t("generic.bottom")}/>}
    </div>
  </>)
}

const Activities = ({activities, style, className}: {activities: Awaited<GetActivitiesResponse>} & ComponentPropsWithoutRef<"div">) => {
  const cssIndexCounter = useCssIndexCounter(style)
  const {t} = useTranslation()

  return (<>
    <ul className={cn("space-y-6 py-8 animate-delay-in", className)} style={cssIndexCounter()}>
      {activities.map((activity) => {
        const Icon = Icon.type[`${activity.category}`]
        return (
          <li key={activity._id}>
            <Link href={`/${activity.slug}`} className="flex flex-col gap-2 p-4 -m-4 rounded-lg group relative">
              <div className="flex flex-row items-start gap-4 md:gap-6">
                <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
                  <Image src={activity.cover} alt="cover"/>
                </div>
                <div className="flex flex-col grow text-stone-600 text-sm">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">{activity.title}</h2>
                    <div className="hidden relative md:flex items-center gap-1 text-xs font-medium text-stone-500">
                      <span className={cn("flex items-center rounded-md gap-1 transition")}>
                        <Icon.post.viewFilled/>{activity.view}
                      </span>
                      <Icon.symbol.dot className="stroke-[3px] -mx-1 opacity-70"/>
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
                  <div className="flex md:hidden items-center gap-1 text-sm font-medium text-stone-500">
                    <Icon/><span>{t(`bookshelf.category.${activity.category}`)}</span>
                    <Icon.symbol.dot className="stroke-[4px] -mx-1 opacity-70"/>
                    <span className={cn("flex items-center rounded-md gap-1 transition")}>
                      <Icon.post.viewFilled/>{activity.view}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 mb-2">{activity.douban?.subtitle}</p>
                  <MyComment activity={activity} className="hidden md:block"/>
                </div>
              </div>
              <MyComment activity={activity} className="block md:hidden"/>
              <span className={cn("absolute inset-1 -z-10 rounded-xl bg-stone-100 opacity-0 transition-all duration-200 ease-bounce",
                "group-hover:-inset-1 dark:bg-neutral-800 group-hover:opacity-100 group-active:bg-stone-200 group-active:dark:bg-neutral-700")}></span>
              <BounceBackground/>
            </Link>
          </li>
        )
      })}
    </ul>
  </>)
}

const MyComment = ({activity, className}: {activity: Activity} & ComponentPropsWithoutRef<"div">) => {
  const {t, i18n: {language: locale}} = useTranslation()

  return (<>
    <div className={cn("bg-stone-50 dark:bg-stone-900 rounded-lg p-3 [&:has(.prose-sm:not(:empty))_>_div:first-child]:mb-2 transition-colors duration-200 group-hover:bg-stone-200 group-hover:dark:bg-stone-800", className)}>
      <div className="flex items-center text-xs gap-2 text-stone-500">
        <span>{t(`bookshelf.${activity.category}.status.${activity.status}`, {date: format(activity.date, {locale, relativeWithDate: true})})}</span>
        {!!activity.rating && (<>
          <span className="text-stone-200 dark:text-stone-800 select-none">|</span>
          <StarRating rating={activity.rating} max={5} description/>
        </>)}
      </div>
      <MDX code={activity.body.code} className="prose-sm prose-p:mt-0 text-stone-800 dark:text-stone-400"/>
    </div>
  </>)
}

export const LatestActivityList = ({data, style, className}: {data: GetActivitiesResponse} & ComponentPropsWithoutRef<"div">) => {
  const cssIndexCounter = useCssIndexCounter(style)
  const {t, i18n: {language: locale}} = useTranslation()
  const activities = use(data).slice(0, 2)

  return (<>
    <ul className={cn("space-y-6 animate-delay-in", className)} style={cssIndexCounter()}>
      {activities.map((activity) => (
        <li key={activity._id}>
          <Link href={`/${menu.bookshelf}`} className="flex flex-col items-start px-4 py-2 -mx-4 gap-2 group relative">
            <div className="flex items-center gap-2 w-full">
              <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0">
                <Image src={site.avatar} alt="Avatar"/>
              </div>
              <div className="flex flex-col w-full text-stone-600 dark:text-stone-400">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm">{site.author}</span>
                  <span className="flex items-center rounded-md gap-1 text-xs">
                    <Icon.post.view/>{activity.view}
                  </span>
                </div>
                <div className="flex items-center text-xs gap-2">
                    <span className="line-clamp-1">
                      {t(`bookshelf.${activity.category}.status.${activity.status}`, {date: format(activity.date, {locale, relativeWithDate: true})})}
                    </span>
                  {!!activity.rating && (<>
                    <span className="text-stone-200 dark:text-stone-800 select-none">|</span>
                    <StarRating rating={activity.rating} max={5} description/>
                  </>)}
                </div>
              </div>
            </div>
            <span className="flex gap-1 text-sm">
              <MDX code={activity.body.code} className="prose-sm line-clamp-3 prose-p:mt-0 text-stone-800 dark:text-stone-200"/>
            </span>
            <div className="flex w-full rounded-lg p-3 group-hover:bg-stone-200 bg-stone-100 dark:bg-stone-800 dark:group-hover:bg-stone-700 dark:text-stone-400 transition-colors">
              <div className="relative w-14 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
                <Image src={activity.cover} alt="cover"/>
              </div>
              <div className="flex flex-col grow text-stone-600 dark:text-stone-400 text-sm px-4">
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
            <BounceBackground/>
          </Link>
        </li>
      ))}
    </ul>
  </>)
}
