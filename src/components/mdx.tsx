"use client"
import {useMDXComponent} from "next-contentlayer2/hooks"
import Image from "next/image"
import {ComponentPropsWithoutRef} from "react"
import {useTheme} from "next-themes"
import {useMounted} from "@/lib/hooks"
import Link from "next/link"
import {Icons} from "@/components/icons"

export function MDX({code, ...props}: ComponentPropsWithoutRef<"div"> & {code: string}) {
  const MDXContent = useMDXComponent(code)
  const {resolvedTheme} = useTheme()
  const mounted = useMounted()
  if (!mounted) return null

  return (<>
    <div className="prose toc-content max-w-none dark:prose-invert animate-delay-in" {...props}>
      {resolvedTheme == "light" &&
        <link href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/light-no-italics.css" rel="stylesheet"/>}
      {resolvedTheme == "dark" &&
        <link href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/no-italics.css" rel="stylesheet"/>}
      <MDXContent components={{
        // @ts-ignore
        img: Image,
        // @ts-ignore
        a: MdxLink
      }}/>
    </div>
  </>)
}

function MdxLink({className, ...props}: ComponentPropsWithoutRef<"a"> & {href: string}) {
  if (props.children == "↩") return (<>
    <Link {...props} className={className}>
      <Icons.post.goBack className="inline w-3 h-3 mb-0.5"/></Link>
  </>)

  return <Link {...props}/>
}