"use client"

import * as React from "react"
import Link from "next/link"
import {ThemeToggle} from "@/components/theme-toggle"
import {useSelectedLayoutSegment} from "next/navigation"
import Image from "next/image"

export function Header() {
  const pathname = useSelectedLayoutSegment()

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b bg-stone-100/80 px-4 backdrop-blur dark:bg-stone-900/80">
      <div className="flex items-center gap-20">
        <Link href="/" rel="nofollow" className="flex items-center">
          <Image src="/logo.svg" width={140} height={30} alt=""/>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle/>
      </div>
    </header>
  )
}
