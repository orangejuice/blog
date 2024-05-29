import type {Metadata} from "next"
import "./globals.css"
import {Inter as FontSans, JetBrains_Mono as FontMono} from "next/font/google"
import {cn} from "@/lib/utils"
import {Context} from "@/app/[locale]/context"
import {Header} from "@/components/header"
import {site} from "@/site"
import React from "react"
import {getMessages, unstable_setRequestLocale} from "next-intl/server"
import {NextIntlClientProvider} from "next-intl"
import {Footer} from "@/components/footer"

const fontSans = FontSans({subsets: ["latin"], variable: "--font-sans"})
const fontMono = FontMono({subsets: ["latin"], variable: "--font-mono"})

export const metadata: Metadata = {
  title: site.title,
  description: site.description
}

export default async function RootLayout({children, params: {locale}}:
  Readonly<{children: React.ReactNode, params: {locale: string}}>) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("flex flex-col font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <NextIntlClientProvider messages={messages}>
          <Context>
            <div className="flex w-full flex-col max-w-5xl px-4 mx-auto xl:px-0 my-8">
              <Header/>
              {children}
              <Footer/>
            </div>
          </Context>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return site.locales.map((locale) => ({locale}))
}

