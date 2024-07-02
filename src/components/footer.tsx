import {ThemeToggle} from "@/components/theme-toggle"
import {site} from "@/site"
import React from "react"
import {BackgroundCanvasToggle, BackgroundMusicToggle} from "@/components/background-toggle"
import Link from "next/link"
import {Icons} from "@/components/icons"

export function Footer() {
  return (<>
    <footer className="flex mt-16 flex-col font-medium md:flex-row md:items-center gap-4 justify-between text-gray-500 dark:text-gray-400">
      <div className="hidden md:flex items-center gap-8 ">
        <ThemeToggle/>
        <BackgroundMusicToggle/>
        <BackgroundCanvasToggle/>
      </div>
      <div className="flex gap-2 text-sm">
        <div>{`Copyright © ${new Date().getFullYear()}`}</div>
        <span>{` • `}</span>
        <span className="inline-flex items-center gap-1 underline-fade">
          <Icons.github/>
          <Link href="https://github.com/orangejuice/blog" target="_blank">{site.title}</Link>
        </span>
      </div>
    </footer>
  </>)
}
