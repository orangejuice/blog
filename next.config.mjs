/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true
  },
  images: {
    remotePatterns: [
      {protocol: "https", hostname: "avatars.githubusercontent.com"}
    ]
  }
}

export default nextConfig
// export default withContentlayer(nextConfig)
