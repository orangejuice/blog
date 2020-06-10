/** @jsx jsx */
// @ts-ignore
import React, {Fragment} from "react"
import {Box, Container, jsx} from "theme-ui"
import "typeface-ibm-plex-sans"
import SEO from "./seo"
import Header from "./Header"
import Footer from "./footer"
import {IntlProvider} from 'react-intl'
import {locales} from "../utils/i18n"

const Layout = ({children, className, pageContext: {locale}}: Props) => (
  <IntlProvider locale={locale} messages={locales[locale]}>
    <Fragment>
      <SEO/>
      <Container>
        <Header/>
        <Box className={className}>
          {children}
        </Box>
        <Footer/>
      </Container>
    </Fragment>
  </IntlProvider>
)

export default Layout

type Props = { children: React.ReactNode; className?: string; pageContext: { locale: string } }
