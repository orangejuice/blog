/** @jsx jsx */
import {jsx, Link} from "theme-ui"
import {locales} from "../utils/i18n"
import {useIntl} from "react-intl"
import LocalizedLink from "./LocalizedLink"

const Footer = () => {
  const {locale} = useIntl()
  const {siteTitle} = locales[locale]

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        mt: [5],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}>
      <div>
        &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
      </div>
      <div sx={{flex: 1}}/>
      <div sx={{mr: 3}}>
        Theme <Link aria-label="Link to GitHub repository" href="https://github.com/orangejuice/blog">Juice</Link>
      </div>
      <div>
        <LocalizedLink aria-label="Subscribe to RSS feed" to="/rss.xml">RSS</LocalizedLink>
      </div>
    </footer>
  )
}

export default Footer
