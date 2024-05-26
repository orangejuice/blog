"use client"

import {useEffect, useState} from "react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {cn} from "@/lib/utils"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const {theme, resolvedTheme, setTheme} = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Button variant="ghost" size="icon" className="h-4 w-4 px-2 py-1.5"/>

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("group h-fit w-fit gap-2 px-2 py-1.5 hover:bg-stone-200 active:bg-stone-300",
          "dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800")}
          onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}>
          {theme === "dark" && <Icons.theme.dark className="transition-all"/>}
          {theme === "light" && <Icons.theme.light className="transition-all"/>}
          {theme === "system" &&
            <div className="relative h-5 w-5">
              <Icons.theme.system className="absolute animate-daleyHide transition-all group-hover:animate-none"/>
              {resolvedTheme === "dark" && <Icons.theme.dark className="absolute animate-daleyShow opacity-0 transition-all group-hover:hidden"/>}
              {resolvedTheme === "light" && <Icons.theme.light className="absolute animate-daleyShow opacity-0 transition-all group-hover:hidden"/>}
            </div>
          }
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="capitalize">{theme}</TooltipContent>
    </Tooltip>
  )
}
