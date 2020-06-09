import * as React from "react"
import {Link} from "gatsby"
import {useIntl} from 'react-intl'
import {defaultLocale} from "../utils/i18n"


const LocalizedLink = ({to, ...props}) => {
  const {locale} = useIntl()

  const isHash = str => /^#/.test(str)
  const isInternal = to => /^\/(?!\/)/.test(to)

  if (isHash(to) || !isInternal(to)) {
    return <Link {...props} to={to}/>
  }

  const isIndex = to === `/`
  const path = locale === defaultLocale ? to : `${locale}${isIndex ? `` : `${to}`}`

  return <Link {...props} to={path}/>
}

export default LocalizedLink
