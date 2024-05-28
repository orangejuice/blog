import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {slug} from "github-slugger"
import React from "react"
import {format} from "@formkit/tempo"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return format(date, {date: "medium"})
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
