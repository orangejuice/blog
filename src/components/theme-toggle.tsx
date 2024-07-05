"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {cn} from "@/lib/utils"
import {useMounted} from "@/lib/use-mounted"
import {useTranslation} from "react-i18next"
import {ComponentPropsWithoutRef} from "react"

export function ThemeToggle({className, small, ...props}: ComponentPropsWithoutRef<"button"> & {small?: boolean}) {
  const mounted = useMounted()
  const {theme, resolvedTheme, setTheme} = useTheme()
  const {t} = useTranslation()

  if (!mounted) return <Button variant="ghost" size="icon" className="h-5 w-5 px-2 py-1.5"/>

  return (<>
    <Button variant="noStyle" className={cn("group h-fit w-fit gap-2 px-2 py-1.5 -mx-2",
      "hover:bg-stone-200 active:bg-stone-300 dark:hover:bg-stone-700 dark:active:bg-stone-800", className)}
      onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")} {...props}>
      {theme === "dark" && <Icons.theme.dark className={small ? "w-4 h-4" : "w-5 h-5"}/>}
      {theme === "light" && <Icons.theme.light className={small ? "w-4 h-4" : "w-5 h-5"}/>}
      {theme === "system" && (<>
        <div className={cn("relative", small ? "h-4 w-4" : "h-5 w-5")}>
          <Icons.theme.system className={cn("absolute animate-delay-hide group-hover:animate-none", small ? "h-4 w-4" : "h-5 w-5")}/>
          {resolvedTheme === "dark" &&
            <Icons.theme.dark className={cn("absolute animate-delay-show opacity-0 group-hover:hidden", small ? "h-4 w-4" : "h-5 w-5")}/>}
          {resolvedTheme === "light" &&
            <Icons.theme.light className={cn("absolute animate-delay-show opacity-0 group-hover:hidden", small ? "h-4 w-4" : "h-5 w-5")}/>}
        </div>
      </>)}
      <span>{t(`theme.${theme}`)}</span>
    </Button>
  </>)
}
