import {getLatestActivitiesPost, getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {SiteLocale} from "@/site"
import {LangSelect, ViewMore} from "@/app/[locale]/page.client"
import {Icons} from "@/components/icons"
import React, {Suspense} from "react"
import {LatestActivityList, PostMainList} from "@/components/post-list"
import initTranslation from "@/i18n"

export default async function Home({params: {locale}}: {params: {locale: SiteLocale}}) {
  const postsOneLang = getPosts({locale, count: 4})
  const postsAllLang = getPosts({locale, count: 4, filterLang: "all-lang"})
  const latestActivities = getLatestActivitiesPost({locale, count: 4})
  const cssIndexCounter = useCssIndexCounter()
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
        <Suspense fallback={<Icons.loading/>}>
          <PostMainList postsOneLang={postsOneLang} postsAllLang={postsAllLang} style={cssIndexCounter()}/>
        </Suspense>
        <ViewMore style={cssIndexCounter()}/>
      </main>
      <aside className="sticky top-8 flex flex-col gap-8">
        <div className="relative border border-transparent border-dashed p-7 group rounded-2xl">
          <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-neutral-950 rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"/>
          <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"/>
          <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
            <p className="flex items-center mb-3 gap-2">
              <Icons.symbol.building/> building
            </p>
          </div>
        </div>
        <section className="animate-delay-in" style={cssIndexCounter()}>
          <h5 className="text-slate-900 font-semibold mb-2 text-sm leading-6 dark:text-slate-100">{t("post.latest-activities")}</h5>
          <Suspense fallback={<Icons.loading/>}>
            <LatestActivityList posts={latestActivities}/>
          </Suspense>
        </section>
      </aside>
    </div>
  </>)
}
