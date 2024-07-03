import {getLatestActivitiesPost, getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {site, SiteLocale} from "@/site"
import {LangSelect} from "@/components/lang-select"
import React, {Suspense} from "react"
import {LatestPostActivityList, PostMainList} from "@/components/post-list"
import initTranslation from "@/lib/i18n"
import {notFound} from "next/navigation"
import {ViewMore} from "@/components/view-more"
import {LatestActivityListPlaceholder, PostMainListPlaceholder} from "@/components/loading"
import {getActivities} from "@/lib/fetch-activity"
import {LatestActivityList} from "@/components/activity-list"

export default async function Home({params: {locale}}: {params: {locale: SiteLocale}}) {
  const cssIndexCounter = useCssIndexCounter()
  if (!site.locales.includes(locale)) return notFound()
  const postsOneLang = getPosts({locale, count: 4})
  const postsAllLang = getPosts({locale, count: 4, lang: "all-lang"})
  const latestPostActivities = getLatestActivitiesPost({locale, count: 4})
  const latestActivities = getActivities(1, {})
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
          <Suspense fallback={<></>}>
            <LangSelect style={cssIndexCounter()}/>
          </Suspense>
        </div>
        <Suspense fallback={<PostMainListPlaceholder/>}>
          <PostMainList postsOneLang={postsOneLang} postsAllLang={postsAllLang} style={cssIndexCounter()}/>
          <ViewMore style={cssIndexCounter()}/>
        </Suspense>
      </main>
      <aside className="flex flex-col gap-8">
        <section>
          <h5 className="text-slate-900 font-semibold mb-2 text-sm leading-6 dark:text-slate-100 animate-delay-in" style={cssIndexCounter()}>
            {t("bookshelf.latest")}
          </h5>
          <Suspense fallback={<LatestActivityListPlaceholder/>}>
            <LatestActivityList data={latestActivities} className="animate-delay-in" style={cssIndexCounter()}/>
          </Suspense>
        </section>
        <section>
          <h5 className="text-slate-900 font-semibold mb-2 text-sm leading-6 dark:text-slate-100 animate-delay-in" style={cssIndexCounter()}>
            {t("post.latest-comments")}
          </h5>
          <Suspense fallback={<LatestActivityListPlaceholder/>}>
            <LatestPostActivityList posts={latestPostActivities} className="animate-delay-in" style={cssIndexCounter()}/>
          </Suspense>
        </section>
      </aside>
    </div>
  </>)
}
