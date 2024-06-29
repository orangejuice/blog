"use client"
import React, {use, useEffect, useRef, useState, useTransition} from "react"
import {Loader2} from "lucide-react"
import type {Activity} from "contentlayer/generated"
import {format, useCssIndexCounter} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import {Image} from "@/components/ui/image"
import {fetchActivities} from "@/lib/actions"
import {MDX} from "@/components/mdx"


export default function ActivityList({data}: {data: Promise<Activity[]>}) {
  const [pages, setPages] = useState([1])
  const [activities, setActivities] = useState(use(data))
  const [hasMore, setHasMore] = useState(true)
  const bottomRef = useRef(null)
  const [isPending, startTransition] = useTransition()
  const cssIndexCounter = useCssIndexCounter()

  useEffect(() => {
    const bottom = bottomRef.current
    const option = {root: null, rootMargin: "20px", threshold: 0}
    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting && hasMore && !isPending && startTransition(async () => {
        const newPages = pages.concat(pages.slice(-1)[0] + 1)
        const newActivities = await fetchActivities(newPages)
        setActivities(newActivities)
        setHasMore(newActivities.length === newPages.length * 10)
        setPages(newPages)
      })
    }, option)
    if (bottom) observer.observe(bottom)
    return () => {if (bottom) observer.unobserve(bottom)}
  }, [isPending])

  return (<>
    <Activities activities={activities}/>
    <div ref={bottomRef} className="h-10 flex items-center justify-center">
      {isPending ? (<Loader2 className="animate-spin mr-2"/>) : (!hasMore && "No more activities")}
    </div>
  </>)
}

const Activities = ({activities}: {activities: Activity[]}) => {
  const {t, i18n: {language: locale}} = useTranslation()
  return (<>
    <div className="py-8">
      <ul className="space-y-4 md:space-y-6">
        {activities.map((activity, index) => (
          <li key={index} className="rounded-lg overflow-hidden">
            <div className="flex flex-row items-start">
              <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg overflow-hidden">
                <Image src={activity.cover} alt="cover"/>
              </div>
              <div className="flex flex-col w-full text-stone-600 text-sm px-4 md:px-6">
                <h2 className="text-xl font-bold text-stone-800">{activity.title}</h2>
                <StarRating rating={activity.douban?.rating} value/>
                <p>{activity.douban?.subtitle}</p>
                <div className="bg-stone-50 rounded-lg mt-2 p-3">
                  <MDX code={activity.body.code} className="prose-sm prose-p:mt-0"/>
                  <div className="flex items-center text-xs justify-end mt-2 gap-2">
                    <span>{format(activity.date, {locale, relativeWithDate: true})}</span>
                    <span className="text-stone-200">|</span>
                    <StarRating rating={activity.rating} description/>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>)
}

const StarRating = ({rating, value = false, description = false}: {rating: number | undefined, value?: boolean, description?: boolean}) => {
  const {t, i18n: {language: locale}} = useTranslation()
  rating ??= 0
  const fullStars = Math.floor(rating / 2)
  const hasHalfStar = rating % 2 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const percentage = (rating % 2) * 50

  return (
    <div className="flex items-center">
      {description && <span className="mr-2">{t(`rating.${rating}`)}</span>}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">★</span>
      ))}
      {hasHalfStar && (
        <span className="relative">
          <span className="text-stone-300">★</span>
          <span className="absolute top-0 left-0 text-yellow-500 overflow-hidden" style={{width: `${percentage}%`}}>
            ★
          </span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-stone-300">★</span>
      ))}
      {value && <span className="ml-2">{rating.toFixed(1)}</span>}
    </div>
  )
}
