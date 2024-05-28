import React from "react"
import {cn, formatDate, useCssIndexCounter} from "@/lib/utils"
import {getLocales, getPosts, getTags} from "@/lib/fetch"
import Link from "next/link"

export default function AllPost() {
  const posts = getPosts()
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="grid md:grid-cols-[1fr,3fr] items-start gap-10 min-h-screen">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold animate-delay-in" style={cssIndexCounter()}>All posts</h1>
          <p className="text-stone-600 animate-delay-in" style={cssIndexCounter()}>
            from 2019 - {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="animate-delay-in" style={cssIndexCounter()}>
            {Object.entries(getLocales()).map(([locale, num]) => (
              <p>{locale}({num})</p>
            ))}
          </h1>
          <div className="text-secondary animate-delay-in" style={cssIndexCounter()}>
            {Object.entries(getTags()).map(([tag, num]) => (
              <p>{tag}({num})</p>
            ))}
          </div>
        </div>
      </div>
      <div className="animate-delay-in" style={cssIndexCounter()}>
        <ul className="flex flex-col pt-[1.5rem] animated-delay-in" style={cssIndexCounter()}>
          {posts.length == 0 && <p>No posts found</p>}
          {posts.map((post) => (
            <li className="py-2.5 group flex flex-col md:flex-row gap-1 md:gap-9">
              <h2 className={cn("md:w-28 text-secondary shrink-0")}>{formatDate(post.date)}</h2>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>)
}