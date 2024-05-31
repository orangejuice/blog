"use client"
import {useMDXComponent} from "next-contentlayer2/hooks"
import Image from "next/image"
import {ComponentPropsWithoutRef} from "react"
import {useTheme} from "next-themes"

export function MDX({code, ...props}: ComponentPropsWithoutRef<"div"> & {code: string}) {
  const MDXContent = useMDXComponent(code)
  const {resolvedTheme} = useTheme()

  return (<>
    <div className="prose toc-content max-w-none dark:prose-invert animate-delay-in" {...props}>
      {resolvedTheme == "light" &&
        <link href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/light-no-italics.css" rel="stylesheet"/>}
      {resolvedTheme == "dark" &&
        <link href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/no-italics.css" rel="stylesheet"/>}
      <MDXContent components={{
        // @ts-ignore
        img: Image
      }}/>
    </div>
  </>)
}