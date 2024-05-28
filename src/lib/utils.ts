import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {slug} from "github-slugger"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTableOfContents(md: string) {
  const headings = [...md.matchAll(/\n(?<hash>#{1,3})\s+(?<content>.+)/g)]
  return headings.map(({groups}) => ({
    level: groups?.hash.length,
    text: groups?.content,
    id: slug(groups?.content ?? "", false)
  }))
}
