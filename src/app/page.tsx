import Link from "next/link"
import {getPosts} from "@/lib/fetch"
import {PostItem} from "@/components/post"
import {useCssIndexCounter} from "@/lib/utils"
import {Icons} from "@/components/icons"

export default function Home() {
  const latest5 = getPosts().slice(0, 5)
  const cssIndexCounter = useCssIndexCounter()

  return (
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <main className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>Latest</h1>
            <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
              intriguing trifles and introspections
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-5 animate-delay-in" style={cssIndexCounter()}>
          {latest5.map(post => <li key={post.slug}><PostItem post={post}/></li>)}
        </ul>
        <Link href={"/all"} className="w-fit mx-auto flex items-center px-4 py-2 mt-5 text-xs font-semibold duration-300 ease-out border rounded-full bg-neutral-900 dark:bg-white dark:text-neutral-900 text-neutral-100 hover:border-neutral-700 border-neutral-900 dark:hover:border-neutral-300 hover:bg-white dark:hover:bg-black dark:hover:text-white hover:text-neutral-900 animate-delay-in" style={cssIndexCounter()}>
          View more <Icons.link.chevron className="w-4 h-4 stroke-[.15rem]"/>
        </Link>
      </main>
      <aside className="sticky top-8">
        <div className="relative border border-transparent border-dashed p-7 group rounded-2xl">
          <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-neutral-950 rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:-translate-x-1 group-hover:-translate-y-1"/>
          <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"/>
          <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
            <h2 className="flex items-center mb-3 gap-2">
              <a href="" className="text-xl font-bold leading-tight tracking-tight sm:text-2xl dark:text-neutral-100">
                Profile
              </a>
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span>{"a"}</span>
            </p>
            <div className="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">
              b
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
