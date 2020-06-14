/** @jsx jsx */
import {jsx, useColorMode} from "theme-ui"
import {Flex} from "@theme-ui/components"
// @ts-ignore
import Banner from "../../static/banner.svg"
import ColorModeToggle from "./ColorModeToggle"
import LangToggle from "./LangToggle"
import LocalizedLink from "./LocalizedLink";
import {useIntl} from "react-intl";

const Header = () => {
  const {formatMessage} = useIntl()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = () => {
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <header>
      <Flex sx={{ alignItems: `center`}}>
        <LocalizedLink to="/"
          aria-label={formatMessage({id: "header.nav.backHome.title"})}
          title={formatMessage({id: "header.nav.backHome.title"})}
          sx={{color: `heading`, textDecoration: `none`, 'svg tspan::selection': {background: `none`}}}>
          <Banner style={{width: `150px`}}/>
        </LocalizedLink>
        <div sx={{flex: 1}}/>
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode}/>
        <LangToggle />
      </Flex>
    </header>
  )
}

export default Header
