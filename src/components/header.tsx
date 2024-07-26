"use client"
import {buttonVariants} from "@/components/ui/button"
import {cn, objectToUrlPart} from "@/lib/utils"
import {menu} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption as PostFilterOption} from "@/app/[locale]/all/[[...filter]]/filter"
import {FilterOption as ActivityFilterOption} from "@/app/[locale]/bookshelf/[[...filter]]/filter"
import {useSelectedLayoutSegment} from "next/navigation"
import {LocaleSwitch} from "@/components/locale-switch"
import {useMounted} from "@/lib/use-mounted"
import Link from "next/link"
import {Icon} from "@/components/ui/icon"
import {useTranslation} from "react-i18next"
import {ThemeToggle} from "@/components/theme-toggle"
import {BackgroundCanvasToggle, BackgroundMusicToggle} from "@/components/background-toggle"
import {AnimatePresence, motion, Variants} from "framer-motion"
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"
import {createPortal} from "react-dom"

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [postFilter] = useLocalStorage<PostFilterOption>("post-filter", {})
  const [activityFilter] = useLocalStorage<ActivityFilterOption>("activity-filter", {})
  const {t} = useTranslation()

  return (<>
    <header className="flex mb-8 w-full shrink-0 items-center justify-between">
      <Link href="/" className="flex items-center shrink-0"><Icon.logo/></Link>
      <div className="flex items-center gap-2">
        <nav className="flex max-md:hidden items-center gap-4 text-sm font-medium">
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
  const {t} = useTranslation()
  const [postFilter] = useLocalStorage<PostFilterOption>("post-filter", {})
  const [activityFilter] = useLocalStorage<ActivityFilterOption>("activity-filter", {})
  const mounted = useMounted()
  const variant: Variants = {
    hidden: {opacity: 0, scale: 0.95, transition: {duration: 0.1}},
    show: {opacity: 1, scale: 1, transition: {duration: 0.1}}
  }
  return (<>
    <Menu>{({open}) => (<>
      <MenuButton className={cn(buttonVariants({variant: "noStyle"}), "md:hidden relative w-11 h-11 p-2 outline-none focus-visible:ring-0")}>
        <Icon.nav.menu className={cn("absolute w-7 h-7 inset-2", open ? "opacity-0" : "opacity-100")}/>
        <Icon.nav.close className={cn("absolute w-7 h-7 inset-2", open ? "opacity-100" : "opacity-0")}/>
      </MenuButton>
      <Overlay isOpen={open}/>
      <AnimatePresence>{open && (<>
        <MenuItems as={motion.div} variants={variant} initial="hidden" animate="show" exit="hidden"
          anchor="bottom end" className="z-50 overflow-hidden rounded-md border bg-white dark:bg-black outline-none shadow-xl origin-top-right p-4 min-w-40">
          <div className="flex flex-col gap-6 p-2">
            {Object.entries(menu).map(([key, path]) => (
              <MenuItem key={key} as={Link} href={mounted ? (
                path == menu.post ? `/${path}/${objectToUrlPart(postFilter)}` :
                  path == menu.bookshelf ? `/${path}/${objectToUrlPart(activityFilter)}` : `/${path}`
              ) : ""} className="font-medium">
                {t(`nav.${key}`)}
              </MenuItem>
            ))}
            <span className="-my-2 h-px bg-stone-200 dark:bg-stone-600"></span>
            <LocaleSwitch className="-mx-3 -my-1.5"/>
            <ThemeToggle className="-mx-2 -my-1.5" small/>
            <BackgroundMusicToggle className="-my-1.5" small/>
            <BackgroundCanvasToggle className="-my-1.5" small/>
          </div>
        </MenuItems></>)}
      </AnimatePresence></>)}
    </Menu>
  </>)
}

const Overlay = ({isOpen}: {isOpen: boolean}) => {
  const mounted = useMounted()
  if (!mounted) return null

  return createPortal(<>
    <AnimatePresence>{isOpen && (
      <motion.div initial={{opacity: 0}} animate={{opacity: 0.05}} exit={{opacity: 0}} transition={{duration: 0.1}}
        className="fixed inset-0 bg-black z-20"/>)}
    </AnimatePresence>
  </>, document.body)
}
