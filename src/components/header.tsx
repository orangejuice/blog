/** @jsx jsx */
import {jsx, useColorMode} from "theme-ui"
import {Flex} from "@theme-ui/components"
import * as settings from "../../settings"
// @ts-ignore
import Banner from "../../static/banner.svg"

import ColorModeToggle from "./colormode-toggle"
import {Link} from "gatsby";
import LangToggle from "./LangToggle";

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = () => {
    setColorMode(isDark ? `light` : `dark`)
  }
  const {siteTitle, basePath} = settings

  return (
    <header>
      <Flex sx={{ alignItems: `center`}}>
        <Link
          to={basePath}
          aria-label={`${siteTitle} - Back to home`}
          sx={{color: `heading`, textDecoration: `none`, 'svg tspan::selection': {background: `none`}}}>
          <Banner style={{width: `150px`}}/>
        </Link>
        <div sx={{flex: 1}}/>
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode}/>
        <LangToggle />
      </Flex>
    </header>
  )
}

export default Header
