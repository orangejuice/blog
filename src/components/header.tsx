"use client"
import Link from "next/link"
import {ThemeToggle} from "@/components/theme-toggle"
import {useSelectedLayoutSegment} from "next/navigation"
import Image from "next/image"

export function Header() {
  const pathname = useSelectedLayoutSegment()

  return (
    <header className="flex py-7 w-full shrink-0 items-center justify-between">
      <div className="flex items-center gap-20">
        <Link href="/" rel="nofollow" className="flex items-center">
          <Image src="/logo.svg" width={140} height={30} alt="Logo"/>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle/>
      </div>
    </header>
  )
}
