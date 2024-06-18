import {useCssIndexCounter} from "@/lib/utils"
import {giscusConfig, menu, SiteLocale} from "@/site"
import React, {Suspense} from "react"
import initTranslation from "@/i18n"
import {Comment} from "@/components/comment"
import {Metadata} from "next"
import {Notes, NotesPlaceholder} from "@/app/[locale]/guestbook/page.client"
import {fetchGuestbookComments} from "@/lib/fetch-github"

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const {t} = await initTranslation(locale)
  return {title: t("guestbook.title")}
}

export default async function Page({params: {locale}}: {params: {locale: SiteLocale}}) {
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)
  const stickyNotes = fetchGuestbookComments({
    repo: giscusConfig.repo,
    category: giscusConfig.category!,
    title: menu.guestbook
  })
  return (<>
    <div className="flex flex-col w-full gap-6">
      <section>
        <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("guestbook.title")}</h1>
        <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
          {t("guestbook.title-sub")}
        </p>
      </section>
      <Suspense fallback={<NotesPlaceholder/>}>
        <Notes data={stickyNotes}/>
      </Suspense>
      <Comment slug={menu.guestbook}/>
    </div>
  </>)
}
