import {History as HistoryType} from "contentlayer/generated"
import {SiteLocale} from "@/site"
import {Icon} from "@/components/ui/icon"
import initTranslation from "@/lib/i18n"
import {Image} from "@/components/ui/image"
import {StarRating} from "@/components/star-rating"
import {format, useCssIndexCounter} from "@/lib/utils"
import {MDX} from "@/components/mdx"
import {Comment} from "@/components/comment"
import {InteractionBar} from "@/components/interaction-bar"
import React from "react"
import {TranslationDisclaimer} from "@/components/generic"

export const ActivityPage = async ({slug, activity, locale}: {slug: string, activity: Activity, locale: SiteLocale}) => {
  const TypeIcon = Icon.type[`${activity.category}`]
  const {t} = await initTranslation(locale)
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="grid md:grid-cols-[3fr,2fr] grid-rows-[min-content] items-start gap-10">
      <div className="flex flex-col gap-10 animate-delay-in" style={cssIndexCounter()}>
        <div className="flex flex-row items-start gap-4 md:gap-6">
          <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
            <Image src={activity.cover} alt="cover"/>
          </div>
          <div className="flex flex-col grow gap-1 text-stone-600 text-sm">
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">{activity.title}</h2>
            <StarRating rating={activity.douban?.rating}>
              {!!activity.douban?.rating ? <>
                <span className="ml-1 font-medium text-yellow-600 font-mono tracking-[-0.15em]">
                  {activity.douban?.rating?.toFixed(1)}
                </span>
              </> : <span className="ml-1 font-mono text-xs">{t("bookshelf.rating.0")}</span>}
            </StarRating>
            <div className="flex items-center gap-1 text-sm font-medium text-stone-500">
              <TypeIcon/><span>{t(`bookshelf.category.${activity.category}`)}</span>
              <Icon.symbol.dot className="stroke-[4px] opacity-70"/>
              <InteractionBar slug={slug} mini className="text-sm"/>
            </div>
            <p className="text-sm mt-0.5">{activity.douban?.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="row-start-2 md:row-start-1 md:col-start-2 md:row-span-2 md:h-full flex flex-col justify-between gap-10">
        <ul>
          {[{status: activity.status, rating: activity.rating, date: activity.date, comment: undefined} as PartialBy<HistoryType, "status" | "rating" | "comment"> & {date: string}].concat(
            ...(activity.douban?.history ?? [])).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((history, index) => (
            <li key={index} className="relative [&:not(:last-child)]:pb-8 animate-delay-in" style={cssIndexCounter()}>
              <span className="absolute top-5 left-5 -ml-[0.5px] h-[calc(100%-1rem)] w-px bg-stone-300" aria-hidden="true"></span>
              <div className="relative flex items-start space-x-3 text-stone-300">
                <div className="flex items-center w-6 h-6">
                  <Icon.symbol.dot style={{color: index == 0 ? `var(--color-${activity.category}-2` : undefined}} className="mx-3 stroke-[5px]"/>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-md text-stone-500">
                    <p className="font-medium text-stone-800 dark:text-stone-400">
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
        {locale == "en" && <TranslationDisclaimer style={cssIndexCounter()}/>}
      </div>
      <Comment slug={activity.slug}/>
    </div>
  </>)
}
