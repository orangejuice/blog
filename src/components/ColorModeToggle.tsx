/** @jsx jsx */
import {jsx} from "theme-ui"
import {useIntl} from "react-intl";

type Props = {
  isDark: boolean
  toggle: (e: any) => void
}

// Adapted from: https://codepen.io/aaroniker/pen/KGpXZo and https://github.com/narative/gatsby-theme-novela/blob/714b6209c5bd61b220370e8a7ad84c0b1407946a/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx

const ColorModeToggle = ({isDark, toggle}: Props) => {
  const {formatMessage} = useIntl()

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={isDark ? formatMessage({id: "header.colorToggle.dark.title"}) :
        formatMessage({id: "header.colorToggle.light.title"})}
      title={isDark ? formatMessage({id: "header.colorToggle.dark.title"}) :
        formatMessage({id: "header.colorToggle.light.title"})}
      sx={{
        opacity: 0.65,
        position: `relative`,
        borderRadius: `5px`,
        width: `50px`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        transition: `opacity 0.3s ease`,
        border: `none`,
        outline: `none`,
        background: `none`,
        cursor: `pointer`,
        padding: 0,
        appearance: `none`,
        "&:hover": {opacity: 1},
      }}
    >
      <div
        sx={{
          position: `relative`,
          width: `24px`,
          height: `24px`,
          borderRadius: `50%`,
          border: (t) => (isDark ? `4px solid ${t.colors.toggleIcon}` : `none`),
          backgroundColor: isDark ? `toggleIcon` : `transparent`,
          transform: isDark ? `scale(0.55)` : `scale(1)`,
          transition: `all 1s ease`,
          overflow: isDark ? `visible` : `hidden`,
          boxShadow: (t) => (isDark ? `none` : `inset 8px -8px 0px 0px ${t.colors.toggleIcon}`),
          "&:before": {
            content: `""`,
            position: `absolute`,
            right: `-9px`,
            top: `-9px`,
            height: `24px`,
            width: `24px`,
            border: (t) => (isDark ? `2px solid ${t.colors.toggleIcon}` : `none`),
            borderRadius: `50%`,
            transform: isDark ? `translate(14px, -14px)` : `translate(0, 0)`,
            opacity: isDark ? 0 : 1,
            transition: `transform 0.45s ease`,
          },
          "&:after": {
            content: `""`,
            width: `8px`,
            height: `8px`,
            borderRadius: `50%`,
            margin: `-4px 0 0 -4px`,
            position: `absolute`,
            top: `50%`,
            left: `50%`,
            boxShadow: (t) =>
              `0 -23px 0 ${t.colors.toggleIcon}, 0 23px 0 ${t.colors.toggleIcon}, 23px 0 0 ${t.colors.toggleIcon}, -23px 0 0 ${t.colors.toggleIcon}, 15px 15px 0 ${t.colors.toggleIcon}, -15px 15px 0 ${t.colors.toggleIcon}, 15px -15px 0 ${t.colors.toggleIcon}, -15px -15px 0 ${t.colors.toggleIcon}`,
            transform: isDark ? `scale(1)` : `scale(0)`,
            transition: `all 0.35s ease`,
          },
        }}
      />
    </button>
  );
}

export default ColorModeToggle
