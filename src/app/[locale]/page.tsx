import {getLatestActivitiesPost, getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {SiteLocale} from "@/site"
import {LangSelect, PostList, ViewMore} from "@/app/[locale]/page-client"
import {Icons} from "@/components/icons"
import React from "react"
import {PostCardList} from "@/components/post-list"

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
        <aside className="sticky top-8">
          <div className="relative border border-transparent border-dashed p-7 group rounded-2xl">
            <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-neutral-950 rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"/>
            <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"/>
            <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
              <h2 className="flex items-center mb-3 gap-2">
                <Icons.symbol.building/> building
                <a href="" className="text-xl font-bold leading-tight tracking-tight sm:text-2xl dark:text-neutral-100">
                </a>
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span></span>
              </p>
              <div className="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">

              </div>
            </div>
          </div>
          <section className="animate-delay-in" style={cssIndexCounter()}>
            <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Latest activities</h5>
            <div className="flex flex-wrap text-stone-600">
              <PostCardList posts={latestActivities}/>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
