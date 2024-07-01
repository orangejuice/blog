import React, {ComponentPropsWithoutRef} from "react"
import {cn} from "@/lib/utils"

export function NotesPlaceholder() {
  return (<>
    <div className="w-full flex flex-row items-center justify-center aspect-square md:aspect-[3/1] z-10 animate-pulse">
      <div className="flex w-52 h-52 flex-col bg-stone-100 -rotate-6 dark:bg-stone-900 shadow">
      </div>
      <div className="flex w-52 h-52 flex-col bg-stone-100 rotate-6 dark:bg-stone-900 shadow">
      </div>
    </div>
  </>)
}

export function CalendarPlaceholder({className}: ComponentPropsWithoutRef<"div">) {
  return (<>
    <div className={cn("w-full h-full flex flex-row items-center gap-2 justify-center animate-pulse", className)}>
      {Array(5).fill(
        <div className="flex w-10 h-10 flex-col bg-stone-100 border rounded-md border-stone-200 dark:bg-stone-900">
        </div>
      )}
    </div>
    <div className={cn("w-full h-full flex flex-row items-center gap-2 justify-center animate-pulse", className)}>
      {Array(5).fill(
        <div className="flex w-10 h-10 flex-col bg-stone-100 border rounded-md border-stone-200 dark:bg-stone-900">
        </div>
      )}
    </div>
  </>)
}
