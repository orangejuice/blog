import React from "react"
import {cn, cssIndexCounter, formatDate} from "@/lib/utils"
import {getPosts} from "@/lib/fetch"
import Link from "next/link"
import {DateInput, diffDays} from "@formkit/tempo"

export default function AllPost() {
  const posts = getPosts()
  const showNewBadge = (date: DateInput) => diffDays(new Date(), date) <= 1000

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
            <li className="py-2.5 group">
              <section className="flex flex-col md:flex-row gap-1 md:gap-9">
                <h2 className={cn("md:w-28 text-secondary shrink-0")}>
                  {formatDate(post.date)}
                </h2>
                <Link href={`/${post.slug}`}>
                  {post.title}
                  {showNewBadge(post.date) && (
                    <span className="inline-block px-1.5 py-[1px] relative -top-[2px] font-bold ml-2 text-[10px] uppercase rounded-full brand-gradient text-white">New</span>
                  )}
                </Link>
              </section>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>)
}