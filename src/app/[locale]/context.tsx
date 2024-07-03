"use client"
import {TooltipProvider} from "@/components/ui/tooltip"
import {ThemeProvider} from "next-themes"
import React, {ReactNode, useEffect} from "react"
import type {Resource} from "i18next"
import {createInstance} from "i18next"
import {I18nextProvider} from "react-i18next"
import initTranslation from "@/lib/i18n"
import {AppProgressBar as ProgressBar} from "next-nprogress-bar"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from "@vercel/analytics/next"
import Script from "next/script"

export function Context({children, locale, resources}: {children: ReactNode; locale?: string; resources: Resource}) {
  const i18n = createInstance()
  void initTranslation(locale, i18n, resources)

  useEffect(() => {
    setTimeout(() => {document.body.classList.remove("no-transition")}, 100)
  }, [])

  return (<>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider disableTransitionOnChange attribute="class" enableSystem={true} defaultTheme="system">
        <TooltipProvider>
          {children}
          <ProgressBar height="2px" color="#888" options={{showSpinner: false}} shallowRouting/>
        </TooltipProvider>
      </ThemeProvider>
    </I18nextProvider>
    <SpeedInsights/>
    <Analytics/>
    <Script strategy="lazyOnload" id="charity">
      {`(function (c, l, a, r, i, t, y){
        c[a] = c[a] || function () {(c[a].q = c[a].q || []).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "mmar157og7")`
      }
    </Script>
  </>)
}
