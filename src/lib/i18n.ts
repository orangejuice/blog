import type {i18n, Resource} from "i18next"
import {createInstance} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import {initReactI18next} from "react-i18next/initReactI18next"
import {site, SiteLocale} from "@/site"
import enLang from "@/locales/en/lang.json"
import enTrans from "@/locales/en/translation.json"
import zhLang from "@/locales/zh/lang.json"
import zhTrans from "@/locales/zh/translation.json"

const localeResources = {
  en: {lang: enLang, translation: enTrans}, zh: {lang: zhLang, translation: zhTrans}
}

export default async function initTranslation(locale?: string, i18nInstance?: i18n, resources?: Resource) {
  i18nInstance ??= createInstance()
  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(resourcesToBackend((language: SiteLocale, namespace: string) =>
      // @ts-ignore
      localeResources[language][namespace]))
  }

  await i18nInstance.init({
    lng: locale, resources,
    supportedLngs: site.locales,
    returnEmptyString: false,
    partialBundledLanguages: true,
    ns: ["translation", "lang"],
    fallbackNS: "translation",
    preload: resources ? [] : site.locales
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}
