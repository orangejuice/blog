/** @jsx jsx */
import * as React from "react"
import {Fragment} from "react"
import {Box, Container, jsx} from "theme-ui"
import "typeface-ibm-plex-sans"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({children, className}: LayoutProps) => (
  <Fragment>
    <SEO/>
    <Container>
      <Header/>
      <Box id="skip-nav" className={className}>
        {children}
      </Box>
      <Footer/>
    </Container>
  </Fragment>
)

export default Layout
