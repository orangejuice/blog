import * as React from "react"
import {Helmet} from "react-helmet"
import {withPrefix} from "gatsby"
import {useIntl} from "react-intl"
import {locales} from "../utils/i18n"
import * as settings from "../../settings"

const SEO = ({title, titleId, titleValue, description, pathname, image, children}: PropsType) => {
  const {locale, formatMessage} = useIntl()
  const {siteUrl, siteImage} = settings
  const {siteTitle, siteDescription, author} = locales[locale]

  title = titleId ? formatMessage({id: titleId}, {...titleValue}) : title

  const seo = {
    title: title || siteTitle,
    description: description || siteDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || siteImage}`,
  }
  return (
    <Helmet title={title} defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`}>
      <meta name="description" content={seo.description}/>
      <meta name="image" content={seo.image}/>
      <meta property="og:title" content={seo.title}/>
      <meta property="og:url" content={seo.url}/>
      <meta property="og:description" content={seo.description}/>
      <meta property="og:image" content={seo.image}/>
      <meta property="og:type" content="website"/>
      <meta property="og:image:alt" content={seo.description}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={seo.title}/>
      <meta name="twitter:url" content={seo.url}/>
      <meta name="twitter:description" content={seo.description}/>
      <meta name="twitter:image" content={seo.image}/>
      <meta name="twitter:image:alt" content={seo.description}/>
      <meta name="twitter:creator" content={author}/>
      <link rel="icon" type="image/png" sizes="148x148" href={withPrefix(`/favicon.png`)}/>
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix(`/apple-touch-icon.png`)}/>
      {children}
    </Helmet>
  )
}

type PropsType = {
  title?: string
  titleId?: string
  titleValue?: object
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
}

export default SEO

