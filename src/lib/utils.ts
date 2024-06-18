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

export function format(date: string | Date, locale = "en", options?: {fromNow?: boolean, full?: boolean} | undefined) {
  if (options?.full) return dayjs().locale(locale).format("YYYY-MM-DD HH:mm:ss")
  if (options?.fromNow) return dayjs().locale(locale).to(dayjs(date))
  return dayjs(date).locale(locale).format("ll")
}

export function useCssIndexCounter(style?: React.CSSProperties) {
  const cssIndexCounter: {(): React.CSSProperties, n?: number} = () => {
    cssIndexCounter.n = cssIndexCounter.n || ((style as {"--index": number})?.["--index"] ?? 0)
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
