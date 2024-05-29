import {notFound} from "next/navigation"
import {getRequestConfig} from "next-intl/server"
import {site} from "@/site"

export default getRequestConfig(async ({locale}) => {
  if (!site.locales.includes(locale)) notFound()
  return {messages: (await import(`./messages/${locale}.json`)).default}
})
