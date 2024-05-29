import createMiddleware from "next-intl/middleware"
import {site} from "@/site"

export default createMiddleware({
  locales: site.locales,
  defaultLocale: site.locales[0],
  localePrefix: "as-needed"
})

export const config = {
  matcher: ["/", "/(zh|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"]
}
