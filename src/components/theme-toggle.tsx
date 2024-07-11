"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icon} from "@/components/ui/icon"
import {cn} from "@/lib/utils"
import {useMounted} from "@/lib/use-mounted"
import {useTranslation} from "react-i18next"
import React, {ComponentPropsWithoutRef, MouseEventHandler, startTransition} from "react"

export function ThemeToggle({className, small, ...props}: ComponentPropsWithoutRef<"button"> & {small?: boolean}) {
  const mounted = useMounted()
  const {theme, systemTheme, resolvedTheme, setTheme} = useTheme()
  const {t} = useTranslation()
  const size = small ? "h-4 w-4" : "h-5 w-5"
  const changeTheme: MouseEventHandler<HTMLButtonElement> = (event) => startTransition(() => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    const change = () => setTheme(nextTheme)
    if (!document.startViewTransition || (nextTheme == "system" ? systemTheme : nextTheme) == resolvedTheme) change()
    else {
      document.documentElement.style.setProperty("--ripple-x", `${event.clientX}px`)
      document.documentElement.style.setProperty("--ripple-y", `${event.clientY}px`)
      document.startViewTransition(change)
    }
  })

  return (<>
    {!mounted && (<>
      <Button variant="noStyle" className={cn("group h-fit w-fit gap-2 px-2 py-1.5 -mx-2", className)}>
        <Icon.theme.system className={size}/>
        <span>{t("theme.system")}</span>
      </Button>
    </>)}
    {mounted && (<>
      <Button key={systemTheme} variant="noStyle" onClick={changeTheme} className={cn("group h-fit w-fit gap-2 px-2 py-1.5 -mx-2",
        "hover:bg-stone-200 active:bg-stone-300 dark:hover:bg-stone-700 dark:active:bg-stone-800", className)} {...props}>
        {theme === "dark" && <Icon.theme.dark className={size}/>}
        {theme === "light" && <Icon.theme.light className={size}/>}
        {theme === "system" && (<>
          <div className={cn("relative", size)}>
            <Icon.theme.system className="absolute animate-delay-hide group-hover:animate-none"/>
            {resolvedTheme === "dark" &&
              <Icon.theme.dark className="absolute animate-delay-show opacity-0 group-hover:hidden"/>}
            {resolvedTheme === "light" &&
              <Icon.theme.light className="absolute animate-delay-show opacity-0 group-hover:hidden"/>}
          </div>
        </>)}
        <span>{t(`theme.${theme}`)}</span>
      </Button>
    </>)}
  </>)
}
