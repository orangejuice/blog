"use client"
import {TooltipProvider} from "@/components/ui/tooltip"
import {ThemeProvider, useTheme} from "next-themes"
import type {ReactNode} from "react"
import React from "react"
import type {Resource} from "i18next"
import {createInstance} from "i18next"
import {I18nextProvider} from "react-i18next"
import {site} from "@/site"
import initTranslation from "@/i18n"
import {AppProgressBar as ProgressBar} from "next-nprogress-bar"


export function Context({children, locale, resources}: {children: ReactNode; locale?: string; resources: Resource}) {
  const i18n = createInstance()
  void initTranslation(locale || site.locales[0], i18n, resources)
  const {resolvedTheme} = useTheme()

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
        <TooltipProvider>
          {children}
          <ProgressBar height="2px" color={resolvedTheme == "dark" ? "#fff" : "#888"} options={{showSpinner: false}} shallowRouting/>
        </TooltipProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}
