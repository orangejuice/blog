<div align="center">
  <p><a href="https://orangejuice.cc/"><img alt="Orangejuice" width="200px" src="https://orangejuice.cc/logo.svg" /></a></p>

![deploy](https://img.shields.io/github/deployments/orangejuice/blog/production?logo=vercel&label=Vercel)
![deploy](https://img.shields.io/github/deployments/orangejuice/on-new-giscus-comment/production?logo=cloudflare-workers&label=Cloudflare%20Worker)

<!--
![star](https://img.shields.io/github/stars/orangejuice/blog.svg?style=flat&logo=github&color=48bf1f&label=Star)
![react](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/react?label=React&color=61dafb&logo=react&logoColor=fff)
![typescript](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/dev/typescript?label=Typescript&logo=typescript&logoColor=fff&color=3178c6)
![node](https://img.shields.io/badge/Node.js-^20.2.0-5fa04e?logo=node.js&logoColor=fff)-->
<sub>✅ Comment ✅ Reaction ✅ View Count ✅ Post-it wall ✅ Light/Dark ✅ PC/Mobile</sub>

![nextjs](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/next?label=Next.js&logo=next.js&color=222)
![react](https://img.shields.io/badge/React-05a3cd?logo=react&logoColor=fff)
![typescript](https://img.shields.io/badge/Typescript-3178c6?logo=typescript&logoColor=fff)
![node](https://img.shields.io/badge/Node.js-5fa04e?logo=node.js&logoColor=fff)
![graphql](https://img.shields.io/badge/GraphQL-e10098?logo=graphql&logoColor=fff)
![shadcn](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)
![tailwind](https://img.shields.io/badge/Tailwind%20CSS-06b6d4?logo=tailwindcss&logoColor=fff)
![rss](https://shields.io/badge/RSS-f88900?logo=rss&logoColor=fff)


</div>

## ✨ Features

- `Next.js(App dir/ISR/SSR/CSR)`, `React`, `TailwindCSS`, `Mdx`, `shadcn/ui`, `framer motion`, `contentlayer`
- Responsive UI for seamless experience across PC and mobile devices
- Employs a modern tech stack with a minimalist design language
- Internationalisation(i18n) based on `react-i18next` (works with both server components and client components)
- Offers full Light/Dark Mode compatibility (including `Giscus`, `rehype-prism-plus`, and `Tocbot`)
- Immersive reading experience powered by `Three.js` and `White noise`
- Cached dynamic data and On-demand revalidation
- Supports local/online image files through a custom rehype plugin `rehype-mdx-images`
- Features robust Languages/Tags filtering capabilities
- Comment/Reaction system based on `Giscus` (work together with [On New Giscus Comment](https://github.com/orangejuice/on-new-giscus-comment))
- SEO with generated `sitemap.xml`, `robots.txt`, `Open Graph` & `RSS feed` (i18n ready)

## 🔖 History

- `Jun 18, 2024`  Add Sticky Notes display on Guestbook page.
- `Jun 17, 2024`  Add Article view count display (powered by Cloudflare D1).
- `Jun 03, 2024`  Launch of the new blog system based on Next.js (App dir).
- `Jun 18, 2020`  Imported legacy posts.
- `Jun 17, 2020`  Revamped the entire system with Gatsby, embracing the modern frontend framework - React! (repo: [blog-gatsby](https://github.com/orangejuice/blog-gatsby))
- `Feb 15, 2020`  Updated to iacrus 2.7.0.
- `Feb 14, 2020`  Removed theme files and replaced them with a submodule for better version control.
- `Nov 28, 2018`  Initial deployment based on Hexo / Git pages! [Post](https://orangejuice.cc/2019-03-04-build-a-hexo-blog) (repo: [blog-hexo](https://github.com/orangejuice/blog-hexo))

## ❤️ Credits

- scaffold https://github.com/timlrx/tailwind-nextjs-starter-blog
- TOC https://webtech-note.com/posts/tocbot-contentlayer
- TOC number with decimal https://stackoverflow.com/questions/4098195/
- list compact style https://samuelkraft.com/blog
- list item card style https://github.com/jahirfiquitiva/jahir.dev/
- dotted line animated card style https://github.com/ccbikai/astro-aria
- component css animation https://github.com/jahirfiquitiva/jahir.dev/
- reactions with canvas-confetti https://github.com/jahirfiquitiva/jahir.dev/
- i18n
  - next-intl
    - https://next-intl-docs.vercel.app/docs/
    - https://www.reddit.com/r/nextjs/comments/1buni9a/how_to_use_next_intl_default_locale_without_en_tr/
  - react-i18n
    - https://github.com/i18next/react-i18next
    - https://github.com/i18next/next-app-dir-i18next-example-ts
    - https://github.com/i18nexus/next-i18n-router
    - https://github.com/lifinance/jumper.exchange
    - `i18next.getFixedT(lng, ns, keyPrefix)` https://www.i18next.com/overview/api#getfixedt
- rehype plugin for mdx image compatibility https://sdorra.dev/posts/2022-12-11-contentlayer-next-image
- fetch GitHub data 
  - use GitHub graphql https://github.com/octokit/graphql.js
  - bulk query by using 'search' https://github.com/typeofweb/typeofweb.com/blob/main/generateCommentsCount.ts
- cloudflare worker for updating the new comment
  - cloudflare worker development
  - GitHub GraphQL API
  - PKCS#1 / PKCS#8 ? https://github.com/gr2m/universal-github-app-jwt?tab=readme-ov-file#about-private-key-formats
- post page 3d background https://github.com/stone-skipper/ambient-reader
- React / Next.js
  - `use` streaming asynchronous content https://react.dev/reference/react/use
  - `cache`&`revalidate` https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
  - `revalidate` I failed to control the behavior of `export const revalidate` :(, use on-demand data revalidation instead.
    implemented `api/revalidate` to work with `orangejuice/on-new-giscus-comment`
- TailwindCSS spinner animation lib https://play.tailwindcss.com/OPAsySKNCd
- day.js for date formating https://day.js.org/docs/en/display/format
- RSS feed generation https://spacejelly.dev/posts/how-to-add-a-sitemap-rss-feed-in-next-js-app-router
