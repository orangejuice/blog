import type {Config} from "tailwindcss"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
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
