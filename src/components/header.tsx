"use client"
import {Button, buttonVariants} from "@/components/ui/button"
import {cn, objectToUrlPart} from "@/lib/utils"
import {menu} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption as PostFilterOption} from "@/components/post-filter"
import {FilterOption as ActivityFilterOption} from "@/components/activity-filter"
import {useSelectedLayoutSegment} from "next/navigation"
import {LocaleSwitch} from "@/components/locale-switch"
import {useMounted} from "@/lib/hooks"
import Link from "next/link"
import * as React from "react"
import {Icons} from "@/components/icons"
import {useTranslation} from "react-i18next"
import {ThemeToggle} from "@/components/theme-toggle"
import {BackgroundCanvasToggle, BackgroundMusicToggle} from "@/components/background-toggle"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {AnimatePresence, motion} from "framer-motion"

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [postFilter] = useLocalStorage<PostFilterOption>("post-filter", {})
  const [activityFilter] = useLocalStorage<ActivityFilterOption>("activity-filter", {})
  const {t} = useTranslation()

  return (<>
    <header className="flex mb-8 w-full shrink-0 items-center justify-between">
      <Link href="/" className="flex items-center shrink-0"><Icons.logo/></Link>
      <div className="flex items-center gap-2">
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {Object.entries(menu).map(([key, path]) => (
            <Link key={key} href={mounted ? ((path == menu.post && postFilter) ? `/${path}/${objectToUrlPart(postFilter)}` :
              path == menu.bookshelf ? `/${path}/${objectToUrlPart(activityFilter)}` : `/${path}`) : ""}
              className={cn(buttonVariants({variant: "ghost", size: "icon"}),
                "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all",
                "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800",
                (pathname ?? "") === path && "bg-stone-200 dark:bg-stone-700")}>
              <span className="text-sm font-medium">{t(`nav.${key}`)}</span>
            </Link>
          ))}
          <LocaleSwitch/>
        </nav>
        <MobileNav/>
      </div>
    </header>
  </>)
}


export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation()
  const [postFilter] = useLocalStorage<PostFilterOption>("post-filter", {})
  const [activityFilter] = useLocalStorage<ActivityFilterOption>("activity-filter", {})
  const mounted = useMounted()

  return (<>
    <AnimatePresence>
      {open && <motion.div initial={{opacity: 0}} animate={{opacity: 0.1}} exit={{opacity: 0}}
        className="fixed inset-0 bg-black z-20"/>}
    </AnimatePresence>
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="block w-fit h-fit p-0 hover:bg-transparent md:hidden">
          <Icons.nav.menu className="h-7 w-7"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit shadow-xl p-4 min-w-40">
        <div className="flex flex-col gap-6 p-2">
          {Object.entries(menu).map(([key, path]) => (
            <Link key={key} href={mounted ? ((path == menu.post && postFilter) ? `/${path}/${objectToUrlPart(postFilter)}` :
              path == menu.bookshelf ? `/${path}/${objectToUrlPart(activityFilter)}` : `/${path}`) : ""}
              onClick={() => setOpen(false)} className="font-medium">
              {t(`nav.${key}`)}
            </Link>
          ))}
          <span className="-my-2 h-px bg-stone-200 dark:bg-stone-600"></span>
          <LocaleSwitch className="-mx-3 -my-1.5"/>
          <ThemeToggle className="-mx-2 -my-1.5" small/>
          <BackgroundMusicToggle className="-my-1.5" small/>
          <BackgroundCanvasToggle className="-my-1.5" small/>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}
