"use client"
import {useTransition} from "react"
import {site} from "@/site"
import {cn} from "@/lib/utils"
import {usePathname, useRouter} from "next/navigation"
import {useTranslation} from "react-i18next"
import {Icons} from "@/components/icons"
import {ButtonProps, buttonVariants} from "@/components/ui/button"
import {AnimatePresence, motion, Variants} from "framer-motion"
import {Menu, MenuButton, MenuItems, Radio, RadioGroup} from "@headlessui/react"
import {Check} from "lucide-react"

export function LocaleSwitch(props: ButtonProps) {
  const {t, i18n: {language: resolved}} = useTranslation("lang")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const variant: Variants = {
    hidden: {opacity: 0, scale: 0.95, transition: {duration: 0.1}},
    show: {opacity: 1, scale: 1, transition: {duration: 0.1}}
  }

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace("/".concat(nextLocale, pathname.replace(`/${resolved}`, "")))
      router.refresh()
    })
  }

  return (<>
    <Menu>{({open}) => <>
      <MenuButton disabled={isPending}
        className={cn(buttonVariants({variant: "noStyle"}), "h-fit w-fit gap-2 whitespace-nowrap rounded-lg px-3 py-1.5", props.className,
          "hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800")}>
        <AnimatePresence mode="popLayout">
          {isPending &&
            <motion.span key="p" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.loading className="w-4 h-4"/>
            </motion.span>}
          {!isPending &&
            <motion.span key="c" animate={{opacity: 1}} exit={{opacity: 0}}><Icons.nav.lang/></motion.span>}
        </AnimatePresence>
        {t(resolved, {lng: resolved})}
      </MenuButton>
      <AnimatePresence>{open &&
        <MenuItems static as={motion.div} variants={variant} initial="hidden" animate="show" exit="hidden"
          anchor="bottom end" className="z-50 overflow-hidden rounded-md border bg-white dark:bg-black outline-none shadow-md origin-top-right p-1 min-w-32">
          <RadioGroup value={resolved} onChange={onSelectChange}>
            {site.locales.map((locale) => (
              <Radio key={locale} value={locale} disabled={resolved == locale} className={"relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer font-medium hover:bg-stone-200 dark:hover:bg-stone-800"}>{({checked}) => (<>
                <span className="absolute left-2">
                  {checked && <Check className="h-4 w-4 stroke-[3px]"/>}
                </span>
                <span>{t(locale, {lng: locale})}</span>
              </>)}
              </Radio>
            ))}
          </RadioGroup>
        </MenuItems>}
      </AnimatePresence></>}
    </Menu>
  </>)
}
