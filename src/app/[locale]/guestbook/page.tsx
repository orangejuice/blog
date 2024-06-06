import {useCssIndexCounter} from "@/lib/utils"
import {menu, SiteLocale} from "@/site"
import React from "react"
import initTranslation from "@/i18n"
import {Comment} from "@/components/comment"

export default async function Page({params: {locale}}: {params: {locale: SiteLocale}}) {
  const cssIndexCounter = useCssIndexCounter()
  const {t} = await initTranslation(locale)

  return (<>
    <div className="flex flex-col w-full gap-6">
      <section>
        <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>{t("guestbook.title")}</h1>
        <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
          {t("guestbook.title-sub")}
        </p>
      </section>
      <Comment slug={menu.guestbook}/>
    </div>
  </>)
}
