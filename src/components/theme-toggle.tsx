"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {cn} from "@/lib/utils"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {useMounted} from "@/lib/hooks"
import {useTranslation} from "react-i18next"

export function ThemeToggle() {
  const mounted = useMounted()
  const {theme, resolvedTheme, setTheme} = useTheme()
  const {t} = useTranslation()

  if (!mounted) return <Button variant="ghost" size="icon" className="h-5 w-5 px-2 py-1.5"/>

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("group h-fit w-fit gap-2 px-2 py-1.5 -mx-2 hover:bg-stone-200 active:bg-stone-300",
          "dark:hover:bg-stone-700 dark:active:bg-stone-800")}
          onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}>
          {theme === "dark" && <Icons.theme.dark/>}
          {theme === "light" && <Icons.theme.light/>}
          {theme === "system" && <div className="relative h-5 w-5">
            <Icons.theme.system className="absolute animate-delay-hide group-hover:animate-none"/>
            {resolvedTheme === "dark" &&
              <Icons.theme.dark className="absolute animate-delay-show opacity-0 group-hover:hidden"/>}
            {resolvedTheme === "light" &&
              <Icons.theme.light className="absolute animate-delay-show opacity-0 group-hover:hidden"/>}
          </div>}
          <span>{t(`theme.${resolvedTheme}`)}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t(`theme.${theme}`)}</TooltipContent>
    </Tooltip>
  )
}
