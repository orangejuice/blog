import type {i18n, Resource} from "i18next"
import {createInstance} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import {initReactI18next} from "react-i18next/initReactI18next"
import {site, SiteLocale} from "@/site"
import enLang from "../../data/locales/en/lang.json"
import enTag from "../../data/locales/en/tag.json"
import enTrans from "../../data/locales/en/translation.json"
import zhLang from "../../data/locales/zh/lang.json"
import zhTag from "../../data/locales/zh/tag.json"
import zhTrans from "../../data/locales/zh/translation.json"

const localeResources = {
  en: {lang: enLang, translation: enTrans, tag: enTag}, zh: {lang: zhLang, translation: zhTrans, tag: zhTag}
}

export default async function initTranslation(locale?: string, i18nInstance: i18n = createInstance(), resources?: Resource) {
  i18nInstance.use(initReactI18next)
  !resources && i18nInstance.use(resourcesToBackend((language: SiteLocale, namespace: "lang" | "translation" | "tag") => {
    return localeResources[language][namespace]
  }))

  await i18nInstance.init({
    lng: locale, resources,
    supportedLngs: site.locales,
    returnEmptyString: false,
    partialBundledLanguages: true,
    ns: ["translation", "lang", "tag"],
    fallbackNS: "translation",
    preload: resources ? [] : site.locales
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}
