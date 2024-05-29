import {ThemeToggle} from "@/components/theme-toggle"
import {site} from "@/site"
import React from "react"

export function Footer() {
  return (<>
    <footer className="flex mt-16 items-center justify-between">
      <ThemeToggle/>
      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{`Copyright © ${new Date().getFullYear()}`}</div>
        <span>{` • `}</span>
        <span>{site.title}</span>
      </div>
    </footer>
  </>)
}
