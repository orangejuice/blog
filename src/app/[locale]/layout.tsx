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
import Head from "next/head"

const fontSans = FontSans({subsets: ["latin"], variable: "--font-sans"})
const fontMono = FontMono({subsets: ["latin"], variable: "--font-mono"})

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const {i18n: {resolvedLanguage}} = await initTranslation(locale)

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s | ${site.title}`
    },
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      url: "./",
      siteName: site.title,
      images: ["/open-graph.png"],
      locale: resolvedLanguage,
      type: "website"
    },
    alternates: {types: {"application/rss+xml": site.url.concat("/", resolvedLanguage!, "/feed.xml")}},
    twitter: {
      title: site.title,
      card: "summary_large_image",
      images: ["/open-graph.png"]
    }
  }
}

export default async function RootLayout({children, params: {locale}}:
  Readonly<{children: React.ReactNode, params: {locale: string}}>) {
  const {resources, i18n: {resolvedLanguage: resolved}} = await initTranslation(locale || site.locales[0])

  return (
    <html lang={resolved} suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      <body className={cn("flex flex-col font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Context locale={resolved!} resources={resources}>
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
