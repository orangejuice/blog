import React from "react"
import {cn, formatDate, useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import {Link} from "@/i18n"
import {SiteLocale} from "@/site"
import {unstable_setRequestLocale} from "next-intl/server"
import {FilterOption, PostFilter} from "@/components/post-filter"

export default function AllPost({params: {locale, filter}}: {params: {locale: SiteLocale, filter: FilterOption}}) {
  unstable_setRequestLocale(locale)
  const posts = getPosts({locale, accept: filter?.[0] ?? "all-lang"})
  const locals = getLocales({locale, accept: "all-lang"})
  const tags = getTags({locale, accept: filter?.[0] ?? locale})
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
          <div className="animate-delay-in" style={cssIndexCounter()}>
            <ul className="flex flex-col animated-delay-in" style={cssIndexCounter()}>
              {posts.length == 0 && <p>No posts found</p>}
              {posts.map((post, index) => (
                <li key={index} className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
                  <h2 className={cn("md:w-28 text-secondary text-sm shrink-0")}>{formatDate(post.date)}</h2>
                  <Link href={`/${post.slug}`} className="font-medium">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="flex flex-col gap-6">
          <PostFilter locales={locals} tags={tags} filter={filter}/>
        </aside>
      </div>
    </>
  )
}