import {withContentlayer} from "next-contentlayer2"


/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true
  }
}

export default withContentlayer(nextConfig)