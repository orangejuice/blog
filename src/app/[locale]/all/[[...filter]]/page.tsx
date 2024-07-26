import React, {Suspense} from "react"
import {objectToUrlPart, parseCatchAll, useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import {menu, site, SiteLocale} from "@/site"
import {FilterOption, PostFilter} from "@/app/[locale]/all/[[...filter]]/filter"
import {PostCompactList} from "@/components/post-list"
import initTranslation from "@/lib/i18n"
import {Metadata} from "next"
import {PostCompactListPlaceholder} from "@/components/loading"
import {redirect} from "next/navigation"

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const {t} = await initTranslation(locale)
  return {title: t("post.all")}
}

type Params = {locale: SiteLocale, filter: string[]}

export default async function AllPost({params: {locale, filter}}: {params: Params}) {
  const appliedFilter = parseCatchAll(filter) as FilterOption
  if (!appliedFilter.lang) redirect(`/${menu.post}/${objectToUrlPart({...appliedFilter, lang: locale})}`)
  const posts = getPosts({locale, ...appliedFilter})
  const locales = getLocales()
  const tags = getTags({locale, ...appliedFilter})
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter({mobile: 3})}>{t("post.all")}</h1>
          <p className="text-stone-600 dark:text-stone-400 animate-delay-in" style={cssIndexCounter()}>
            {t("post.all-sub", {year: new Date().getFullYear()})}
          </p>
        </section>
        <Suspense fallback={<PostCompactListPlaceholder/>}>
          <PostCompactList posts={posts} style={cssIndexCounter()}/>
        </Suspense>
      </div>
      <aside className="flex flex-col gap-6 row-start-1 md:col-start-2">
        <Suspense fallback={<></>}>
          <PostFilter locales={locales} tags={tags} filter={appliedFilter} style={cssIndexCounter({mobile: 0})}/>
        </Suspense>
      </aside>
    </div>
  </>)
}

export const generateStaticParams = () => {
  const combinations: Params[] = []
  site.locales.forEach((locale) => {
    ["all-lang"].concat(...site.locales).forEach((lang) => {
      combinations.push({locale, filter: objectToUrlPart({lang: lang}).split("/")})
    })
  })
  return combinations
}
