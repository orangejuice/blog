"use client"
import Link from "next/link"
import Image from "next/image"
import {buttonVariants} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {menu} from "@/site"
import {useLocalStorage} from "@/lib/use-local-storage"
import {FilterOption} from "@/components/post-filter"
import {useSelectedLayoutSegment} from "next/navigation"
import {LocaleSwitcher} from "@/components/locale-switcher"
import {useMounted} from "@/lib/use-mounted"

export function Header() {
  const pathname = useSelectedLayoutSegment()
  const mounted = useMounted()
  const [filter] = useLocalStorage<FilterOption | "">("post-filter", "")

  return (
    <header className="flex mb-8 w-full shrink-0 items-center justify-between">
      <div className="flex items-center gap-20">
        <Link href="/" rel="nofollow" className="flex items-center">
          <Image src="/logo.svg" width={140} height={30} alt="Logo"/>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <nav className="flex items-center gap-4 text-sm font-medium">
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
      </div>
    </header>
  )
}
