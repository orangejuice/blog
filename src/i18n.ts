import type {i18n, Resource} from "i18next"
import {createInstance} from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import {initReactI18next} from "react-i18next/initReactI18next"
import {site} from "@/site"

export default async function initTranslations(locale: string, i18nInstance?: i18n, resources?: Resource) {
  i18nInstance ??= createInstance()
  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(resourcesToBackend((language: string, namespace: string) =>
      import(`@/locales/${language}/${namespace}.json`)))
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: site.locales[0],
    react: {useSuspense: false},
    supportedLngs: site.locales,
    returnEmptyString: false,
    partialBundledLanguages: true,
    defaultNS: "translation",
    fallbackNS: "translation",
    ns: ["translation", "lang"],
    preload: resources ? [] : site.locales
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}