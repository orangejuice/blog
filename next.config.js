const {withContentlayer} = require("next-contentlayer2")

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {protocol: "https", hostname: "avatars.githubusercontent.com"}
    ]
  },
  experimental: {
    reactCompiler: true,
  }
}

module.exports = withContentlayer(nextConfig)