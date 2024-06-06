"use client"
import {Button, buttonVariants} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {menu} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption} from "@/components/post-filter"
import {useSelectedLayoutSegment} from "next/navigation"
import {LocaleSwitcher} from "@/components/locale-switcher"
import {useMounted} from "@/lib/hooks"
import Link from "next/link"
import * as React from "react"
import {Icons} from "@/components/icons"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {useTranslation} from "react-i18next"

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")
  const {t} = useTranslation(undefined, {keyPrefix: "nav"})

  return (<>
    <header className="flex mb-8 w-full shrink-0 items-center justify-between">
      <Link href="/" rel="nofollow" className="flex items-center shrink-0"><Icons.logo/></Link>
      <div className="flex items-center gap-2">
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {Object.entries(menu).map(([key, path]) => (
            <Link key={key}
              href={mounted ? ((path == menu.posts && filter) ? `/${path}/${filter.join("/")}` : `/${path}`) : ""}
              className={cn(buttonVariants({variant: "ghost", size: "icon"}),
                "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all",
                "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800",
                (pathname ?? "/") === path && "bg-stone-200 dark:bg-stone-700")}>
              <span className="text-sm font-medium">{t(key)}</span>
            </Link>
          ))}
          <LocaleSwitcher/>
        </nav>
        <MobileNav/>
      </div>
    </header>
  </>)
}


export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation(undefined, {keyPrefix: "nav"})
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")
  const mounted = useMounted()

  return (<>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="block w-fit h-fit p-0 hover:bg-transparent md:hidden">
          <Icons.nav.menu className="h-7 w-7"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit shadow-xl">
        <div className="flex flex-col gap-6 p-2">
          {Object.entries(menu).map(([key, path]) => (
            <Link onClick={() => setOpen(false)} key={key} className="font-medium"
              href={mounted ? ((path == menu.posts && filter) ? `/${path}/${filter.join("/")}` : `/${path}`) : ""}>
              {t(key)}
            </Link>
          ))}
          <span className="-my-2 h-px bg-stone-200 dark:bg-stone-600"></span>
          <LocaleSwitcher className="-mx-3"/>
        </div>
      </PopoverContent>
    </Popover>
  </>)
}
