import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import React from "react"
import type {Dayjs} from "dayjs"
import dayjs from "dayjs"
import localisedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/zh"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.extend(localisedFormat)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomInRange(min: number, max: number, int = false) {
  const rand = Math.random() * (max - min) + min
  return int ? Math.floor(rand) : rand
}

export function format(date: string | Date | Dayjs, options?: {locale?: string, relative?: boolean, date?: boolean, datetime?: boolean, localizeDate?: boolean, relativeWithDate?: boolean}) {
  const locale = options?.locale ?? "en"
  if (options?.datetime) return dayjs(date).locale(locale).format("YYYY-MM-DD HH:mm:ss")
  if (options?.date) return dayjs(date).locale(locale).format("YYYY-MM-DD")
  if (options?.relative) return dayjs(date).locale(locale).fromNow()
  if (options?.relativeWithDate) {
    const now = dayjs().locale(locale)
    const then = dayjs(date).locale(locale)
    if (now.diff(then, "hours") < 24) {
      return then.fromNow()
    } else if (now.year() === then.year()) {
      let date = then.format("ll")
      if (locale == "en") date = date.replace(`, ${then.year()}`, "")
      if (locale == "zh") date = date.replace(`${then.year()}年`, "")
      return date
    } else {
      return then.format("ll")
    }
  }
  if (options?.localizeDate) return dayjs(date).locale(locale).format("ll")
  return dayjs(date).locale(locale).format("lll")
}

/**
 * Create a range of Day.js dates between a start and end date.
 * [Credits](https://github.com/iamkun/dayjs/issues/1162#issuecomment-1694654608)
 * ```js
 * getDaysBetween(dayjs('2021-04-03'), dayjs('2021-04-05'));
 * // => [dayjs('2021-04-03'), dayjs('2021-04-04'), dayjs('2021-04-05')]
 * ```
 */
export function eachDayInRange(start: string | Date | Dayjs, end?: string | Date | Dayjs) {
  const range = []
  start = dayjs(start)
  end ??= dayjs()
  let current = start
  while (!current.isAfter(end)) {
    range.push(current)
    current = current.add(1, "days")
  }
  return range
}

export function useCssIndexCounter(style?: React.CSSProperties) {
  const cssIndexCounter: {(): React.CSSProperties, n?: number} = () => {
    cssIndexCounter.n = cssIndexCounter.n || ((style as {"--index": number})?.["--index"] ?? 0)
    return {"--index": cssIndexCounter.n++} as React.CSSProperties
  }
  return cssIndexCounter
}

export function shortenNumber(num: number): string {
  if (num < 1000) return num.toString()
  const units = ["", "K", "M", "B", "T"]
  const order = Math.floor(Math.log10(num) / 3)
  const unitName = units[order]
  const numShort = num / Math.pow(10, order * 3)

  return `${numShort.toFixed(1)}${unitName}`
}

export function getRandomLightHexColor() {
  const getLightColorValue = () => Math.floor(randomInRange(208, 256))
  const r = getLightColorValue()
  const g = getLightColorValue()
  const b = getLightColorValue()
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

export function invertColor(hex: string): string {
  if (!hex) return ""
  if (hex.startsWith("#")) hex = hex.slice(1)

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  const invertedR = 255 - r
  const invertedG = 255 - g
  const invertedB = 255 - b

  return `#${invertedR.toString(16).padStart(2, "0")}${invertedG.toString(16).padStart(2, "0")}${invertedB.toString(16).padStart(2, "0")}`
}

export function parseCatchAll(filter: string[] | undefined): Record<string, string> {
  if (!filter || filter.length === 0) return {}
  const result: Record<string, string> = {}
  for (let i = 0; i < filter.length; i += 2) {
    const key = filter[i]
    const value = filter[i + 1]
    if (key && value) result[key] = value
  }
  return result
}

export function objectToUrlPart(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value != "all" && value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}/${encodeURIComponent(value)}`)
    .join("/")
}
