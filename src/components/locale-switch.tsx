"use client"
import * as React from "react"
import {useTransition} from "react"
import {site} from "@/site"
import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {useTranslation} from "react-i18next"
import {Icons} from "@/components/icons"
import {Button, ButtonProps} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {AnimatePresence, motion} from "framer-motion"

export function LocaleSwitch(props: ButtonProps) {
  const {t, i18n: {language: resolved}} = useTranslation("lang")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace("/".concat(nextLocale, pathname.replace(`/${resolved}`, "")))
      router.refresh()
    })
  }

  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="noStyle" disabled={isPending} className={cn(
          "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5", props.className,
          "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
        )}>
          <AnimatePresence mode="popLayout">
            {isPending &&
              <motion.span key="p" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loading className="w-4 h-4"/>
              </motion.span>}
            {!isPending &&
              <motion.span key="c" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.nav.lang/></motion.span>}
          </AnimatePresence>
          {t(resolved, {lng: resolved})}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuRadioGroup value={resolved} onValueChange={onSelectChange}>
          {site.locales.map((locale) =>
            <DropdownMenuRadioItem key={locale} value={locale} disabled={resolved == locale}
              className="cursor-pointer font-medium hover:bg-stone-200 dark:hover:bg-stone-800">
              {t(locale, {lng: locale})}
            </DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}
