import React from "react"
import {cn, formatDate, useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import Link from "next/link"
import {Icons} from "@/components/icons"

export default function AllPost() {
  const posts = getPosts()
  const cssIndexCounter = useCssIndexCounter()

  return (<>
      <div className="grid md:grid-cols-[2fr,1fr] items-start gap-10 min-h-screen">
        <div className="flex flex-col gap-5">
          <section>
            <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>All posts</h1>
            <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
              from 2019 - {new Date().getFullYear()}
            </p>
          </section>
          <div className="animate-delay-in" style={cssIndexCounter()}>
            <ul className="flex flex-col animated-delay-in" style={cssIndexCounter()}>
              {posts.length == 0 && <p>No posts found</p>}
              {posts.map((post) => (
                <li className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
                  <h2 className={cn("md:w-28 text-secondary text-sm shrink-0")}>{formatDate(post.date)}</h2>
                  <Link href={`/${post.slug}`} className="font-medium">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="flex flex-col gap-6">
          <section className="animate-delay-in" style={cssIndexCounter()}>
            <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Languages</h5>
            <div className="flex flex-wrap text-stone-600">
              {Object.entries(getLocales()).map(([locale, num]) => (
                <Link href={"/all"} className="flex items-center group m-2 text-sm font-medium underline-fade">
                  <Icons.hash/>{{zh: "Chinese", en: "English"}[locale]} ({num})
                </Link>
              ))}
            </div>
          </section>
          <section className="animate-delay-in" style={cssIndexCounter()}>
            <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Tags</h5>
            <div className="flex flex-wrap text-stone-600">
              {Object.entries(getTags()).map(([tag, num]) => (
                <Link href={"/all"} className="flex items-center group m-2 text-sm font-medium underline-fade">
                  <Icons.hash/>{tag} ({num})
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}