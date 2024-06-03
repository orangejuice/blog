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

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")

  return (<>
    <header className="flex mb-8 w-full shrink-0 items-center justify-between">
      <div className="flex items-center gap-20">
        <Link href="/" rel="nofollow" className="flex items-center shrink-0">
          <Icons.logo/>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {Object.values(menu).map(({name, path}) => (
            <Link key={name}
              href={mounted ? ((path == menu.posts.path && filter) ? `/${path}/${filter.join("/")}` : `/${path}`) : ""}
              className={cn(buttonVariants({variant: "ghost", size: "icon"}),
                "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all",
                "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800",
                (pathname ?? "/") === path && "bg-stone-200 dark:bg-stone-700")}>
              <span className="text-sm font-medium">{name}</span>
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

  return (<>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="block w-fit h-fit p-0 hover:bg-transparent md:hidden">
          <Icons.nav.menu className="h-7 w-7"/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit shadow-xl">
        <div className="flex flex-col gap-6 p-2">
          {Object.values(menu).map(({name, path}) => (
            <Link href={path} onClick={() => setOpen(false)} key={path} className="text-2xl">
              {name}
            </Link>
          ))}
          <span className="-mx-1 -my-2 h-px bg-stone-200 dark:bg-stone-600"></span>
          <LocaleSwitcher className="-mx-3"/>
        </div>
      </PopoverContent>
    </Popover>
  </>)
}
