This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Credits

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
- rehype plugin for mdx image compatibility https://sdorra.dev/posts/2022-12-11-contentlayer-next-image
- fetch GitHub data 
  - use GitHub graphql https://github.com/octokit/graphql.js
  - bulk query by using 'search' https://github.com/typeofweb/typeofweb.com/blob/main/generateCommentsCount.ts
- cloudflare worker for updating the new comment
  - cloudflare worker development
  - GitHub GraphQL API
  - PKCS#1 / PKCS#8 ? https://github.com/gr2m/universal-github-app-jwt?tab=readme-ov-file#about-private-key-formats
 