import type {Config} from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaults from "tailwindcss/defaultTheme"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        show: {to: {opacity: "100"}}
      },
      animation: {
        daleyHide: "hide 0.2s ease-out 2s forwards",
        daleyShow: "show 0.2s ease-out 2s forwards"
      }
    }
  },
  plugins: [animate, typography]
}
export default config
