import * as React from "react"
import {Link} from "gatsby"
import {defaultLocale} from "../utils/i18n"
import * as settings from "../../settings"
import {useIntl} from "react-intl";

const LocalizedLink = ({to, ...props}) => {
  // Workaround
  // For gatsby build - onPostBuild - Error
  // Error: [React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.
  try{
    useIntl()
  } catch (e) {
    return <React.Fragment/>
  }

  const {locale} = useIntl()
  const {basePath} = settings

  const isHash = str => /^#/.test(str)
  const isFullLink = to => /^(http|https|\/\/)/.test(to)

  if (isHash(to) || isFullLink(to)) {
    return <a {...props} href={to}/>
  }

  const path = basePath + (locale === defaultLocale ? to : `/${locale}${to}`)

  return <Link {...props} to={path.replace(/\/\/+/g, `/`)}/>
}

export default LocalizedLink
