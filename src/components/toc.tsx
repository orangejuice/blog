"use client"
import {useEffect} from "react"
import tocbot from "tocbot"
import "./toc.css"
import {Icons} from "@/components/icons"

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".toc-content",
      headingSelector: "h1, h2, h3",
      orderedList: true,
      scrollSmooth: true,
      scrollSmoothDuration: 400,
      collapseDepth: 6
    })
    return () => tocbot.destroy()
  }, [])

  return (
    <div className="flex flex-col gap-2 dark:bg-gray-800">
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">Table of contents</h5>
      <section className="toc py-2 pl-2 text-slate-700 text-sm leading-6">
        <Icons.loading className="mx-auto animate-spin"/>
      </section>
    </div>
  )
}