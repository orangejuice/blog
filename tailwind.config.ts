import type {Config} from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaults from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaults.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaults.fontFamily.mono]
      },
      typography: {
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": false,
            "blockquote p:first-of-type::after": false,
            "blockquote p": {"margin": 0},
            "ol li p": {"margin": 0},
          }
        }
      },
      keyframes: {
        hide: {to: {opacity: "0"}},
        show: {to: {opacity: "100"}},
        in: {"0%": {transform: "translateY(18px)", opacity: "0"}, "100%": {transform: "translateY(0)", opacity: "100"}},
        fade: {"0%, 100%": {opacity: "1"}, "50%": {opacity: " 0.3"}}
      },
      animation: {
        "delay-in": "in .6s calc(var(--index) * 130ms) both",
        "delay-hide": "hide 0.2s ease-out 2s forwards",
        "delay-show": "show 0.2s ease-out 2s forwards",
        "fade": "fade 1.4s infinite both"
      }
    }
  },
  plugins: [animate, typography, plugin(({matchUtilities, theme}) => {
    matchUtilities({"animation-delay": (value) => ({"animation-delay": value})},
      {values: theme("transitionDelay")})
  })]
}
export default config
