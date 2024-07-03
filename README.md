<div align="center">
  <p><a href="https://orangejuice.cc/"><img alt="Orangejuice" width="200px" src="https://orangejuice.cc/logo.svg" /></a></p>

![deploy](https://img.shields.io/github/deployments/orangejuice/blog/production?logo=vercel&label=Vercel)
![deploy](https://img.shields.io/github/deployments/orangejuice/on-new-giscus-comment/production?logo=cloudflare-workers&label=Cloudflare%20Worker)

<!--
![star](https://img.shields.io/github/stars/orangejuice/blog.svg?style=flat&logo=github&color=48bf1f&label=Star)
![react](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/react?label=React&color=61dafb&logo=react&logoColor=fff)
![typescript](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/dev/typescript?label=Typescript&logo=typescript&logoColor=fff&color=3178c6)
![node](https://img.shields.io/badge/Node.js-^20.2.0-5fa04e?logo=node.js&logoColor=fff)-->
<sub>✅ i18n ✅ Comment ✅ Reaction ✅ View count ✅ Post-it wall ✅ Book/TV/Show tracking ✅ Light/Dark ✅ PC/Mobile</sub>

![nextjs](https://img.shields.io/github/package-json/dependency-version/orangejuice/blog/next?label=Next.js&logo=next.js&color=222)
![react](https://img.shields.io/badge/React-05a3cd?logo=react&logoColor=fff)
![typescript](https://img.shields.io/badge/Typescript-3178c6?logo=typescript&logoColor=fff)
![node](https://img.shields.io/badge/Node.js-5fa04e?logo=node.js&logoColor=fff)
![graphql](https://img.shields.io/badge/GraphQL-e10098?logo=graphql&logoColor=fff)
![shadcn](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)
![tailwind](https://img.shields.io/badge/Tailwind%20CSS-06b6d4?logo=tailwindcss&logoColor=fff)
![zustand](https://img.shields.io/badge/🐻-Zustand-222?colorA=222)
![rss](https://shields.io/badge/RSS-f88900?logo=rss&logoColor=fff)
![douban](https://shields.io/badge/豆瓣-2D963D?logo=douban&logoColor=fff)

</div>

## ✨ Features

- `Next.js(App dir/ISR/SSR/CSR)`, `React`, `TailwindCSS`, `Mdx`, `shadcn/ui`, `framer motion`, `contentlayer`
- Post-it wall available on [Guessbook](https://orangejuice.cc/guestbook)
- Book/TV/Show tracking available on [Bookshelf](https://orangejuice.cc/bookshelf)
- Comment/Reaction system based on `Giscus` (work together with [On New Giscus Comment](https://github.com/orangejuice/on-new-giscus-comment))
- Responsive UI, minimalist design language with a bit of move elements
- Cached dynamic data and On-demand revalidation
- In-depth customized for Markdown + i18n writing workflow
- SEO with generated `sitemap.xml`, `robots.txt`, `Open Graph` & `RSS feed`

## 🙌 Highlight

* **🕰️ Activity Calendar** `src/components/activity-calendar.tsx`  
  An elegant calendar component intuitively displays yearly reading and watching activities.

* **🧭 Mobile Menu** `src/components/header.tsx`  
  Mobile menu with slightly darken overlay, built with headless-ui and framer motion.

* **🎨 Immersive 3D Background** `src/components/background.tsx`  
  A dynamic, peaceful three-dimensional backdrop.

* **🔊 White Noise Toggle** `src/components/background-toggle.tsx`  
  Animated ambient sound control built with framer motion.

* **💡 Theme Toggle** `src/components/theme-toggle.tsx`  
  A simple and creative theme preference control.

* **💾 Cross-Tab State Sync** `src/lib/use-local-storage.ts`  
  A handy encapsulated react hook that maintains state across tabs, use in the same way of using `useState`.

* **📝 Skeuomorphic Sticky Notes** `src/components/sticky-notes.tsx`  
  A sleek implementation of skeuomorphic sticky notes, drag enabled.

* **📄 Markdown Image Support** `src/lib/remark-image-processor.ts`  
  Add support for local/online images through a custom remark plugin

<sup>more to come...</sup>

## 🔖 History

- `Jul 01, 2024`  Introducing a new feature - Book/TV/Show tracking.
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
- Zustand cross tab sync https://github.com/pmndrs/zustand/discussions/1614
- Yozai Font https://github.com/lxgw/yozai-font
