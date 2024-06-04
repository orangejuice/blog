import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {slug} from "github-slugger"
import React from "react"
import dayjs from "dayjs"
import localisedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/zh"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.extend(localisedFormat)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function format(date: string | Date, locale = "en", options?: {fromNow: boolean, full: boolean} | undefined) {
  if (options?.full) return dayjs().locale(locale).format("YYYY-MM-DD HH:mm:ss")
  if (options?.fromNow) return dayjs().locale(locale).to(dayjs(date))
  return dayjs(date).locale(locale).format("LL")
}

export function useCssIndexCounter() {
  const cssIndexCounter: {(): React.CSSProperties, n?: number} = () => {
    cssIndexCounter.n = cssIndexCounter.n || 0
    return {"--index": cssIndexCounter.n++} as React.CSSProperties
  }
  return cssIndexCounter
}

export function getTableOfContents(md: string) {
  const headings = [...md.matchAll(/\n(?<hash>#{1,3})\s+(?<content>.+)/g)]
  return headings.map(({groups}) => ({
    level: groups?.hash.length,
    text: groups?.content,
    id: slug(groups?.content ?? "", false)
  }))
}
