import * as React from "react"
import {Link} from "gatsby"
import {defaultLocale} from "../utils/i18n"
import * as settings from "../../settings"
import {useIntl} from "react-intl";

const LocalizedLink = ({to, ...props}) => {
  // Workaround
  // For gatsby build - onPostBuild - Error
  // Error: [React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.
  // locale information is not existed while rss generating
  try{
    useIntl()
  } catch (e) {
    return <a {...props} href={to}/>
  }

  const {locale} = useIntl()
  const {basePath} = settings

  const path = basePath + (locale === defaultLocale ? to : `/${locale}/${to}`)

  return <Link {...props} to={path.replace(/\/\/+/g, `/`)}/>
}

export default LocalizedLink
