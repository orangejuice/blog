import type {Metadata} from "next"
import "./globals.css"
import {Inter as FontSans, JetBrains_Mono as FontMono} from "next/font/google"
import {cn} from "@/lib/utils"
import {Context} from "@/app/[locale]/context"
import {Header} from "@/components/header"
import {site} from "@/site"
import React from "react"
import {Footer} from "@/components/footer"
import initTranslation from "@/i18n"
import {BgCanvas} from "@/components/bg-canvas"

const fontSans = FontSans({subsets: ["latin"], variable: "--font-sans"})
const fontMono = FontMono({subsets: ["latin"], variable: "--font-mono"})

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  return {
    title: site.title,
    description: site.description,
    alternates: {types: {"application/rss+xml": site.url.concat("/", locale, "/feed.xml")}}
  }
}

export default async function RootLayout({children, params: {locale}}:
  Readonly<{children: React.ReactNode, params: {locale: string}}>) {
  const {resources} = await initTranslation(locale || site.locales[0])

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("flex flex-col font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Context locale={locale} resources={resources}>
          <div className="flex w-full flex-col max-w-5xl px-6 mx-auto xl:px-0 my-8">
            <Header/>
            {children}
            <Footer/>
          </div>
          <BgCanvas/>
        </Context>
      </body>
    </html>
  )
}

export const generateStaticParams = () => {
  return site.locales.map((locale) => ({locale}))
}
