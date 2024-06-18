import {getLatestActivitiesPost, getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {site, SiteLocale} from "@/site"
import {LangSelect} from "@/components/lang-select"
import {Icons} from "@/components/icons"
import React, {Suspense} from "react"
import {LatestActivityList, PostMainList} from "@/components/post-list"
import initTranslation from "@/i18n"
import {notFound} from "next/navigation"
import {ViewMore} from "@/components/view-more"
import {util} from "protobufjs"
import Array = util.Array

export default async function Home({params: {locale}}: {params: {locale: SiteLocale}}) {
  const cssIndexCounter = useCssIndexCounter()
  if (!site.locales.includes(locale)) return notFound()
  const postsOneLang = getPosts({locale, count: 4})
  const postsAllLang = getPosts({locale, count: 4, filterLang: "all-lang"})
  const latestActivities = getLatestActivitiesPost({locale, count: 4})
  const {t} = await initTranslation(locale)

  return (<>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <main className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <section>
            <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("post.latest")}</h1>
            <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
              {t("post.latest-sub")}
            </p>
          </section>
          <LangSelect style={cssIndexCounter()}/>
        </div>
        <Suspense fallback={<PostMainListPlaceholder/>}>
          <PostMainList postsOneLang={postsOneLang} postsAllLang={postsAllLang} style={cssIndexCounter()}/>
          <ViewMore style={cssIndexCounter()}/>
        </Suspense>
      </main>
      <aside className="sticky top-8 flex flex-col gap-8">
        <div className="relative border border-transparent border-dashed p-7 group rounded-2xl animate-delay-in" style={cssIndexCounter()}>
          <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-neutral-950 rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"/>
          <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"/>
          <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
            <p className="flex items-center mb-3 gap-2">
              <Icons.symbol.building/> building
            </p>
          </div>
        </div>
        <section>
          <h5 className="text-slate-900 font-semibold mb-2 text-sm leading-6 dark:text-slate-100 animate-delay-in" style={cssIndexCounter()}>
            {t("post.latest-activities")}
          </h5>
          <Suspense fallback={<LatestActivityListPlaceholder/>}>
            <LatestActivityList posts={latestActivities} className="animate-delay-in" style={cssIndexCounter()}/>
          </Suspense>
          <LatestActivityListPlaceholder/>
        </section>
      </aside>
    </div>
  </>)
}


export function PostMainListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {[...new Array(4)].map((_, index) =>
        <li key={index}>
          <div className="group flex flex-col items-start no-underline relative p-4 rounded-xl -mx-4 bg-transparent gap-1">
            <div className="flex items-center gap-2 w-full h-6 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="flex items-center gap-1 flex-wrap">
              <div className="h-6 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="h-6 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
            <div className="w-full h-4 bg-stone-100 dark:bg-stone-900 rounded mt-2"></div>
            <div className="w-full h-4 bg-stone-100 dark:bg-stone-900 rounded mt-1"></div>
            <div className="flex w-full mt-2.5 text-xs justify-between font-medium">
              <div className="w-1/4 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  </>)
}

export function LatestActivityListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {[...new Array(4)].map((_, index) =>
        <li key={index}>
          <div className="flex flex-col items-start px-4 py-2 rounded-md -mx-4 transition-colors gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-stone-100 dark:bg-stone-900 rounded-full"></div>
              <div className="flex flex-col items-start">
                <div className="h-4 w-24 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="h-3 w-16 bg-stone-100 dark:bg-stone-900 rounded mt-1"></div>
              </div>
            </div>
            <div className="h-4 w-1/2 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="w-full px-3 py-1 h-6 bg-stone-100 dark:bg-stone-900 rounded-md mt-2"></div>
          </div>
        </li>
      )}
    </ul>
  </>)
}
