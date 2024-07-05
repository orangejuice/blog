import {Activity as ActivityType, History as HistoryType} from "contentlayer/generated"
import {SiteLocale} from "@/site"
import {Icons} from "@/components/icons"
import initTranslation from "@/lib/i18n"
import {Image} from "@/components/ui/image"
import {StarRating} from "@/components/activity-list"
import {format, useCssIndexCounter} from "@/lib/utils"
import {MDX} from "@/components/mdx"
import {Comment} from "@/components/comment"
import React from "react"

export const Activity = async ({activity, locale}: {activity: ActivityType, locale: SiteLocale}) => {
  const Icon = Icons.type[`${activity.category}`]
  const {t} = await initTranslation(locale)
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="grid md:grid-cols-[3fr,2fr] grid-rows-[min-content] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-10 animate-delay-in" style={cssIndexCounter()}>
        <div className="flex flex-row items-start gap-4 md:gap-6">
          <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
            <Image src={activity.cover} alt="cover"/>
          </div>
          <div className="flex flex-col grow text-stone-600 text-sm">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">{activity.title}</h2>
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
          </div>
        </div>
      </div>
      <ul className="row-start-2 md:row-start-1 md:col-start-2 md:row-span-2">
        {[{status: activity.status, rating: activity.rating, date: activity.date, comment: undefined} as PartialBy<HistoryType, "status" | "rating" | "comment"> & {date: string}].concat(
          ...(activity.douban?.history ?? [])).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((history, index) => (
          <li key={index} className="relative [&:not(:last-child)]:pb-8 animate-delay-in" style={cssIndexCounter()}>
            <span className="absolute top-5 left-5 -ml-[0.5px] h-[calc(100%-1rem)] w-px bg-stone-300" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3 text-stone-300">
              <div className="flex items-center w-6 h-6">
                <Icons.symbol.dot style={{color: index == 0 ? `var(--color-${activity.category}-2` : undefined}} className="mx-3 stroke-[5px]"/>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-md text-stone-500">
                  <p className="font-medium text-stone-900">
                    {t(`bookshelf.${activity.category}.status.${history.status}`, {date: ""})}
                  </p>
                  <span className="whitespace-nowrap text-xs">
                    {format(history.date, {locale})}
                  </span>
                </div>
                {index == 0 &&
                  <MDX code={activity.body.code} className="prose-sm prose-p:mt-0 text-stone-800 dark:text-stone-400"/>}
                {history.comment &&
                  <p className="text-stone-800 dark:text-stone-400 text-sm whitespace-pre-wrap">
                    {history.comment}
                  </p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Comment slug={activity.slug}/>
    </div>
  </>)
}