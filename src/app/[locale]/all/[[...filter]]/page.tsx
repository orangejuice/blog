import React from "react"
import {useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import {SiteLocale} from "@/site"
import {FilterOption, PostFilter} from "@/components/post-filter"
import {PostCompactList} from "@/components/post-list"

export default async function AllPost({params: {locale, filter}}: {params: {locale: SiteLocale, filter: FilterOption}}) {
  const posts = await getPosts({locale, filterLang: filter?.[0] ?? "all-lang", filterTag: filter?.[1] ? decodeURI(filter[1]) : filter?.[1]})
  const locales = getLocales()
  const tags = getTags({locale, filterLang: filter?.[0] ?? locale})
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>All posts</h1>
          <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
            from 2019 - {new Date().getFullYear()}
          </p>
        </section>
        <PostCompactList posts={posts} style={cssIndexCounter()} key={filter.join()}/>
      </div>
      <aside className="flex flex-col gap-6">
        <PostFilter locales={locales} tags={tags} filter={filter}/>
      </aside>
    </div>
  </>)
}