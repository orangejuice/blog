import type {Config} from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaults from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  future: {hoverOnlyWhenSupported: true},
  theme: {
    extend: {
      colors: {stone: {"150": "#EEEDEC", "850": "#231F1E"}},
      fontSize: {xxs: ["0.625rem", {lineHeight: "1rem"}]},
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
            "ol li p": {"margin": 0}
          }
        }
      },
      transitionTimingFunction: {"bounce": "cubic-bezier(.175,.885,.32,1.275)"},
      keyframes: {
        bounce: {from: {opacity: "0", transform: "translateY(12px)"}, to: {opacity: "1", transform: "translateY(0)"}},
        hide: {to: {opacity: "0"}},
        show: {to: {opacity: "100"}},
        fadeLoop: {"0%, 100%": {opacity: "1"}, "50%": {opacity: "0.3"}},
        waveLoop: {"0%, 100%": {transform: "scaleY(1)", transformOrigin: "center"}, "50%": {transform: "scaleY(0.5)"}}
      },
      animation: {
        "bounce": "bounce 1s cubic-bezier(0.2,0.7,0.3,1) forwards",
        "delay-hide": "hide 0.2s ease-out 2s forwards",
        "delay-show": "show 0.2s ease-out 2s forwards",
        "fade": "fadeLoop 1.4s infinite both",
        "wave": "waveLoop 1.4s infinite ease-in-out"
      }
    }
  },
  plugins: [animate, typography, plugin(({matchUtilities, theme}) => {
    matchUtilities({"animate-delay": (value) => ({"animation-delay": value})},
      {values: theme("transitionDelay")})
  })]
}
export default config
