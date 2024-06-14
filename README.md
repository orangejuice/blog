<div align="center">
  <a href="https://orangejuice.cc/">
    <img alt="Orangejuice" width="200px" src="https://orangejuice.cc/logo.svg" />
  </a>
</div>

![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

## ✨ Features

- Utilizes `Next.js` (App dir/ISR/SSR/CSR), `React`, `TailwindCSS`, `Mdx`, `shadcn/ui`, `framer motion`, and `contentlayer`
- Responsive UI for seamless experience across PC and mobile devices
- Employs a modern tech stack with a minimalist design language
- Internationalisation(i18n) based on `react-i18next` (works with both server components and client components)
- Offers full Light/Dark Mode compatibility (including `Giscus`, `rehype-prism-plus`, and `Tocbot`)
- Provides an immersive reading experience powered by `React Three Fiber` (Three.js) and `white noise`
- Creative (and also minimalist) `Light/Dark` and `White noise On/Off` toggle UX and UI
- Supports local/online image files through a custom rehype plugin, `rehype-mdx-images`
- Utilizes `GraphQL` to fetch GitHub discussion data for interaction
- Features robust Languages/Tags filtering capabilities
- Includes a Comment/Reaction system based on `Giscus` (work together with [On New Giscus Comment](https://github.com/orangejuice/on-new-giscus-comment))
- SEO with generated `sitemap.xml`, `robots.txt`, `Open Graph` & `RSS feed` (i18n ready)

## 🔖 History

- Jun 03, 2024: Launch of the new blog system based on Next.js (App dir).
- Jun 18, 2020: Imported legacy posts.
- Jun 17, 2020: Revamped the entire system with Gatsby, embracing the modern frontend framework - React! (repo: [blog-gatsby](https://github.com/orangejuice/blog-gatsby))
- Feb 15, 2020: Updated to iacrus 2.7.0.
- Feb 14, 2020: Removed theme files and replaced them with a submodule for better version control.
- Nov 28, 2018: Initial deployment based on Hexo / Git pages! [Post](https://orangejuice.cc/2019-03-04-build-a-hexo-blog) (repo: [blog-hexo](https://github.com/orangejuice/blog-hexo))

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
