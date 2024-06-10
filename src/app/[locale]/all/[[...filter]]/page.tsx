import React, {Suspense} from "react"
import {useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import {SiteLocale} from "@/site"
import {FilterOption, PostFilter} from "@/components/post-filter"
import {Icons} from "@/components/icons"
import {PostCompactList} from "@/components/post-list"
import initTranslation from "@/i18n"
import {Metadata} from "next"

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
        <Suspense fallback={<Icons.loading/>}>
          <PostCompactList posts={posts} style={cssIndexCounter()}/>
        </Suspense>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        <PostFilter locales={locales} tags={tags} filter={filter} style={cssIndexCounter()}/>
      </aside>
    </div>
  </>)
}
