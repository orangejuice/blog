import {ThemeToggle} from "@/components/theme-toggle"
import {site} from "@/site"
import React from "react"
import {BackgroundMusicToggle} from "@/components/bgm-toggle"

export function Footer() {
  return (<>
    <footer className="flex mt-16 items-center justify-between text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-8">
        <ThemeToggle/>
        <BackgroundMusicToggle/>
      </div>
      <div className="flex gap-2 text-sm">
        <div>{`Copyright © ${new Date().getFullYear()}`}</div>
        <span>{` • `}</span>
        <span>{site.title}</span>
      </div>
    </footer>
  </>)
}
