"use client"
import {useMDXComponent} from "next-contentlayer2/hooks"
import {default as NextImage, ImageProps} from "next/image"
import {ComponentPropsWithoutRef, useEffect} from "react"
import {useTheme} from "next-themes"
import Link from "next/link"
import {Icon} from "@/components/ui/icon"
import {useTranslation} from "react-i18next"
import {cn} from "@/lib/utils"
import "./mdx.css"


export function MDX({code, className, ...props}: ComponentPropsWithoutRef<"div"> & {code: string}) {
  const MDXContent = useMDXComponent(code)
  const {resolvedTheme} = useTheme()
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    if (resolvedTheme == "dark") {
      link.href = "https://unpkg.com/prism-theme-night-owl@1.4.0/build/no-italics.css"
    } else {
      link.href = "https://unpkg.com/prism-theme-night-owl@1.4.0/build/light-no-italics.css"
    }
    document.head.appendChild(link)
    return () => {document.head.removeChild(link)}
  }, [resolvedTheme])

  return (<>
    <div className={cn("prose toc-content max-w-none dark:prose-invert", className)} {...props}>
      <MDXContent components={{
        // @ts-ignore
        img: Image,
        h2: H2,
        // @ts-ignore
        a: MdxLink
      }}/>
    </div>
  </>)
}

function Image({className, ...props}: ImageProps) {
  return <NextImage className={cn(className, "w-4/5 md:w-3/5 mx-auto")} {...props} />
}

function MdxLink({className, ...props}: ComponentPropsWithoutRef<"a"> & {href: string}) {
  if (props.hasOwnProperty("data-footnote-backref")) {
    return (<>
      <Link {...props} className={className}>
        <Icon.post.goBack className="inline w-3 h-3 mb-0.5"/>
      </Link>
    </>)
  }
  return <Link {...props}/>
}

function H2({className, ...props}: ComponentPropsWithoutRef<"h2">) {
  const {t} = useTranslation()

  if (props.id == "footnote-label" && Array.isArray(props.children) && props.children[1] == "Footnotes") {
    props.children = [props.children[0], t("post.footnotes")]
  }

  return <h2 {...props} className={className}>{props.children}</h2>
}
