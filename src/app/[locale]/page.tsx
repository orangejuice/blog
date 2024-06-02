import {getLatestActivitiesPost, getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {SiteLocale} from "@/site"
import {LangSelect, PostList, ViewMore} from "@/app/[locale]/page-client"
import {Icons} from "@/components/icons"
import React from "react"
import {LatestActivityList} from "@/components/post-list"

export default async function Home({params: {locale}}: {params: {locale: SiteLocale}}) {
  const postsOneLang = (await getPosts({locale, count: 4}))
  const postsAllLang = (await getPosts({locale, count: 4, filterLang: "all-lang"}))
  const latestActivities = await getLatestActivitiesPost({locale, count: 4})
  const cssIndexCounter = useCssIndexCounter()

  return (<>
      <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
        <main className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <section>
              <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>Latest</h1>
              <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
                intriguing trifles and introspections
              </p>
            </section>
            <LangSelect style={cssIndexCounter()}/>
          </div>
          <PostList postsOneLang={postsOneLang} postsAllLang={postsAllLang} style={cssIndexCounter()}/>
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
            <h5 className="text-slate-900 font-semibold mb-2 text-sm leading-6 dark:text-slate-100">Latest activities</h5>
            <LatestActivityList posts={latestActivities}/>
          </section>
        </aside>
      </div>
    </>
  )
}
