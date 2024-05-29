import {notFound} from "next/navigation"
import {getRequestConfig} from "next-intl/server"
import {site, SiteLocale} from "@/site"
import {createSharedPathnamesNavigation} from "next-intl/navigation"

export default getRequestConfig(async ({locale}) => {
  if (!site.locales.includes(locale as SiteLocale)) notFound()
  return {messages: (await import(`./messages/${locale}.json`)).default}
})

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales: site.locales, localePrefix: "as-needed"})

