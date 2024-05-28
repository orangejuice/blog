import type {Config} from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaults from "tailwindcss/defaultTheme"

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
            "blockquote p:first-of-type::after": false
          }
        }
      },
      keyframes: {
        hide: {to: {opacity: "0"}},
        show: {to: {opacity: "100"}},
        in: {
          "0%": {transform: "translateY(18px)", opacity: "0"},
          "100%": {transform: "translateY(0)", opacity: "100"}
        }
      },
      animation: {
        "delay-in": "in .6s calc(var(--index) * 130ms) both",
        "delay-hide": "hide 0.2s ease-out 2s forwards",
        "delay-show": "show 0.2s ease-out 2s forwards"
      }
    }
  },
  plugins: [animate, typography]
}
export default config
