"use client"
import {TooltipProvider} from "@/components/ui/tooltip"
import {ThemeProvider} from "next-themes"

export function Context({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
