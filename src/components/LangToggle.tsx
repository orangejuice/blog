/** @jsx jsx */
import {jsx} from "theme-ui"
// @ts-ignore
import Globe from "../../static/globe.svg"


const LangToggle = () => (
  <button
    type="button"
    sx={{
      opacity: 0.65,
      display: `flex`,
      alignItems: `center`,
      width: `50px`,
      marginLeft: `10px`,
      justifyContent: `space-between`,
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
    <Globe style={{width: `25px`, marginTop: `1px`}}/>En
  </button>
)

export default LangToggle
