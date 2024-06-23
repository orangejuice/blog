import React, {Suspense} from "react"
import {useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import {SiteLocale} from "@/site"
import {FilterOption, PostFilter} from "@/components/post-filter"
import {PostCompactList} from "@/components/post-list"
import initTranslation from "@/lib/i18n"
import {Metadata} from "next"
import {Icons} from "@/components/icons"

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const {t} = await initTranslation(locale)
  return {title: t("post.all")}
}

export default async function AllPost({params: {locale, filter}}: {params: {locale: SiteLocale, filter: FilterOption}}) {
  const posts = getPosts({locale, filterLang: filter?.[0] ?? "all-lang", filterTag: filter?.[1] ? decodeURI(filter[1]) : filter?.[1]})
  const locales = getLocales()
  const tags = getTags({locale, filterLang: filter?.[0] ?? locale})
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("post.all")}</h1>
          <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
            {t("post.all-sub", {year: new Date().getFullYear()})}
          </p>
        </section>
        <Suspense fallback={<PostCompactListPlaceholder/>}>
          <PostCompactList posts={posts} style={cssIndexCounter()}/>
        </Suspense>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        <Suspense fallback={<Icons.loading/>}>
          <PostFilter locales={locales} tags={tags} filter={filter} style={cssIndexCounter()}/>
        </Suspense>
      </aside>
    </div>
  </>)
}


function PostCompactListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {Array.from({length: 10}, (_, index) =>
        <li key={index} className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
          <div className="flex w-full md:w-fit items-center justify-between">
            <div className="md:w-28 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="gap-4 text-xs w-fit flex md:hidden">
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="w-full md:w-1/2 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="gap-4 text-xs hidden md:flex">
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
          </div>
        </li>)}
    </ul>
  </>)
}
