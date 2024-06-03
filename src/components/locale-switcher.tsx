"use client"
import * as React from "react"
import {useTransition} from "react"
import {site} from "@/site"
import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {useTranslation} from "react-i18next"
import {Icons} from "@/components/icons"
import {Button, ButtonProps} from "@/components/ui/button"
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu"
import {DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"

export function LocaleSwitcher(props: ButtonProps) {
  const {t, i18n} = useTranslation("lang")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  let pathname = usePathname()

  function onSelectChange(nextLocale: string) {
    pathname = i18n.language == site.locales[0] ? pathname : pathname.replace(`/${i18n.language}`, "")
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname}`)
      router.refresh()
    })
  }

  return (<>
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(
          "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all", props.className,
          "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
        )}>
          <Icons.nav.lang className="z-0 pointer-events-none"/>
          {t(i18n.language, {lng: i18n.language})}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuRadioGroup value={i18n.language} onValueChange={onSelectChange}>
          {site.locales.map((cur) =>
            <DropdownMenuRadioItem key={cur} value={cur} disabled={i18n.language == cur}
              className="cursor-pointer hover:bg-stone-200">
              {t(cur, {lng: cur})}
            </DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}


type Checked = DropdownMenuCheckboxItemProps["checked"]
