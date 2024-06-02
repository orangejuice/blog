import {getPosts} from "@/lib/fetch"
import {useCssIndexCounter} from "@/lib/utils"
import {SiteLocale} from "@/site"
import {LangSelect, PostList, ViewMore} from "@/app/[locale]/page-client"
import {Icons} from "@/components/icons"

export default async function Home({params: {locale}}: {params: {locale: SiteLocale}}) {
  const postsOneLang = (await getPosts({locale})).slice(0, 4)
  const postsAllLang = (await getPosts({locale, filterLang: "all-lang"})).slice(0, 4)
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <main className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <section>
            <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>Latest</h1>
            <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
              intriguing trifles and introspections
            </p>
          </section>
          <LangSelect style={cssIndexCounter()}/>
        </div>
        <PostList postsOneLang={postsOneLang} postsAllLang={postsAllLang} style={cssIndexCounter()}/>
        <ViewMore style={cssIndexCounter()}/>
      </main>
      <aside className="sticky top-8">
        <div className="relative border border-transparent border-dashed p-7 group rounded-2xl">
          <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-neutral-950 rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"/>
          <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"/>
          <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
            <h2 className="flex items-center mb-3 gap-2">
              <Icons.symbol.building/> building
              <a href="" className="text-xl font-bold leading-tight tracking-tight sm:text-2xl dark:text-neutral-100">
              </a>
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span></span>
            </p>
            <div className="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">

            </div>
          </div>
        </div>
      </aside>
    </div>
  </>)
}
