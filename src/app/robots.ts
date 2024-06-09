import {MetadataRoute} from "next"
import {site} from "@/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: site.url.concat("/sitemap.xml")
  }
}
