"use client"
import {Button, buttonVariants} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {menu} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption} from "@/components/post-filter"
import {useSelectedLayoutSegment} from "next/navigation"
import {LocaleSwitcher} from "@/components/locale-switcher"
import {useMounted} from "@/lib/use-mounted"
import Link from "next/link"
import * as React from "react"
import {Icons} from "@/components/icons"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")

  return (
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
      {/*<div className="fixed bottom-0 left-0 right-0 z-50 h-16 w-full border-t bg-white md:hidden">*/}
      {/*  <div className="grid h-full max-w-lg grid-cols-3 gap-6">*/}
      {/*    */}
      {/*  </div>*/}
      {/*</div>*/}
    </header>
  )
}


export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (<>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-2 hover:bg-transparent md:hidden">
          <Icons.nav.menu className="h-7 w-7"/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <div className="flex flex-col gap-10 my-4 h-[calc(75vh-6rem)] overflow-scroll pl-6">
          {Object.values(menu).map(({name, path}) => (
            <Link href={path} onClick={() => setOpen(false)} key={path} className="text-3xl">
              {name}
            </Link>
          ))}
          <LocaleSwitcher/>
        </div>
      </SheetContent>
    </Sheet>
  </>)
}

//
// const NavItemMobile = (url: string, icon: MobilePage["icon"], name: MobilePage["name"], isActive: boolean) => (
//   <button type="button" key={url} className={["inline-flex flex-col text-xs items-center justify-center rounded-full px-5 hover:bg-gray-100",
//     isActive ? "font-semibold" : ""
//   ].join(" ")}
//     onClick={() => router.push(url)}>
//     {icon[isActive ? 1 : 0]}
//     <span className="">{name}</span>
//   </button>
// )