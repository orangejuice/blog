import {Icons} from "@/components/icons"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {getPosts} from "@/lib/fetch"
import {format} from "@formkit/tempo"

export default function Home() {
  const latest5 = getPosts().slice(0, 5)

  return (
    <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
      <main className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Latest</h1>
            <p className="text-stone-600">introspection and innovations.</p>
          </div>
          <div>
            <Link href={""} className="underline underline-offset-4">
              See all
            </Link>
          </div>
        </div>
        <ul className="flex flex-col gap-5">
          {latest5.map(post => <>
            <li key={post.slug} className="pt-5 group flex flex-col gap-y-1">
              <h2 className="text-xl font-bold tracking-tight">
                <Link href={`/${post.slug}`} className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  {post.title}
                  <Icons.link.arrow className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 -translate-x-1.5 w-4 h-4 stroke-[4px] transition-all ease-in-out duration-200 transform"/>
                </Link>
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag, index) =>
                  <Button key={index} variant="secondary" className={cn("h-fit truncate px-1 py-0.5 text-xs text-stone-600",
                    "hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700")}>
                    {tag}
                  </Button>)}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {post.excerpt}
              </div>
              <div className="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">
                Posted on <time dateTime={post.date}>{format(post.date, {date: "medium"})}</time>
              </div>
            </li>
          </>)}
        </ul>
      </main>
      <aside>
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
