import {i18nRouter} from "next-i18n-router"
import {NextRequest} from "next/server"
import {site} from "@/site"

export function middleware(request: NextRequest) {
  return i18nRouter(request, {
    locales: site.locales,
    defaultLocale: site.locales[0]
  })
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/(.*feed.xml$)"]
}
