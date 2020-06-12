/** @jsx jsx */
import {jsx, Link} from "theme-ui"
import {locales} from "../utils/i18n"
import {useIntl} from "react-intl"

const Footer = () => {
  const {locale} = useIntl()
  const {siteTitle} = locales[locale]

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
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
      <div>Theme <Link aria-label="Link to the theme's GitHub repository"
          href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog">Juice</Link>
      </div>
    </footer>
  )
}

export default Footer
