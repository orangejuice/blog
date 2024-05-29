import {withContentlayer} from "next-contentlayer2"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true
  }
}

export default withNextIntl(withContentlayer(nextConfig))