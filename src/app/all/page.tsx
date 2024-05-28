import React from "react"
import {cn, formatDate, useCssIndexCounter} from "@/lib/utils"
import {getPosts} from "@/lib/fetch"
import Link from "next/link"

export default function AllPost() {
  const posts = getPosts()
  const cssIndexCounter = useCssIndexCounter()

  return (<>
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-2">
          <h1 className="animate-delay-in" style={cssIndexCounter()}>Blog</h1>
          <p className="text-secondary animate-delay-in" style={cssIndexCounter()}>
            I write about CSS, animation techniques, design systems and more.
          </p>
        </div>
      </div>
      <div className="animate-delay-in" style={cssIndexCounter()}>
        <ul className="flex flex-col animated-delay-in" style={cssIndexCounter()}>
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