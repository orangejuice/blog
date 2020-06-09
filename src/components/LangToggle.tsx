/** @jsx jsx */
import {jsx} from "theme-ui"
// @ts-ignore
import Globe from "../../static/globe.svg"
import {useIntl} from 'react-intl';
import {defaultLocale, locales} from "../utils/i18n";

const LangToggle = () => {
  const {locale, formatMessage} = useIntl()

  const langSwitchLink = locale === defaultLocale ? '/zh' : `/`

  return (
    <button
      type="button"
      onClick={() => window.open(langSwitchLink, "_self")}
      aria-label={formatMessage({id: 'header.langToggle.title'})}
      title={formatMessage({id: 'header.langToggle.title'})}
      sx={{
        opacity: 0.65,
        display: `flex`,
        alignItems: `center`,
        marginLeft: `10px`,
        transition: `opacity 0.3s ease`,
        border: `none`,
        outline: `none`,
        background: `none`,
        cursor: `pointer`,
        padding: 0,
        appearance: `none`,
        "&:hover": {opacity: 1},
        fontSize: `1`,
        color: t => t.colors.toggleIcon,
      }}>
      <Globe style={{width: `25px`, margin: `1px 10px 0 0`}}/>
      {locales[locale].name}
    </button>
  )
}

export default LangToggle
