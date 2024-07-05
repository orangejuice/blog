import React, {ComponentPropsWithoutRef} from "react"
import {cn} from "@/lib/utils"


export function PostMainListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {Array.from({length: 4}, (_, index) =>
        <li key={index}>
          <div className="group flex flex-col items-start no-underline relative p-4 rounded-xl -mx-4 bg-transparent gap-1">
            <div className="flex items-center gap-2 w-full h-6 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="flex items-center gap-1 flex-wrap">
              <div className="h-6 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="h-6 w-12 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
            <div className="w-full h-4 bg-stone-100 dark:bg-stone-900 rounded mt-2"></div>
            <div className="w-full h-4 bg-stone-100 dark:bg-stone-900 rounded mt-1"></div>
            <div className="flex w-full mt-2.5 text-xs justify-between font-medium">
              <div className="w-1/4 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  </>)
}


export function PostCompactListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {Array.from({length: 10}, (_, index) =>
        <li key={index} className="py-2.5 group flex items-baseline flex-col md:flex-row gap-1 md:gap-9">
          <div className="flex w-full md:w-fit items-center justify-between">
            <div className="md:w-28 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="gap-4 text-xs w-fit flex md:hidden">
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="w-full md:w-1/2 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="gap-4 text-xs hidden md:flex">
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
              <div className="w-8 h-4 bg-stone-100 dark:bg-stone-900 rounded"></div>
            </div>
          </div>
        </li>)}
    </ul>
  </>)
}


export function LatestActivityListPlaceholder() {
  return (<>
    <ul className="animate-pulse">
      {Array.from({length: 3}, (_, index) =>
        <li key={index}>
          <div className="flex flex-col items-start px-4 py-2 rounded-md -mx-4 transition-colors gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-stone-100 dark:bg-stone-900 rounded-full"></div>
              <div className="flex flex-col items-start">
                <div className="h-4 w-24 bg-stone-100 dark:bg-stone-900 rounded"></div>
                <div className="h-3 w-16 bg-stone-100 dark:bg-stone-900 rounded mt-1"></div>
              </div>
            </div>
            <div className="h-4 w-1/2 bg-stone-100 dark:bg-stone-900 rounded"></div>
            <div className="w-full px-3 py-1 h-6 bg-stone-100 dark:bg-stone-900 rounded-md mt-2"></div>
          </div>
        </li>
      )}
    </ul>
  </>)
}

export function NotesPlaceholder() {
  return (<>
    <div className="w-full flex flex-row items-center justify-center aspect-square md:aspect-[3/1] animate-pulse">
      <div className="flex w-52 h-52 flex-col bg-stone-100 -rotate-6 dark:bg-stone-900 shadow">
      </div>
      <div className="flex w-52 h-52 flex-col bg-stone-100 rotate-6 dark:bg-stone-900 shadow">
      </div>
    </div>
  </>)
}

export function CalendarPlaceholder({className, bodyOnly}: ComponentPropsWithoutRef<"div"> & {bodyOnly?: boolean}) {
  const body = (<>
    <div className={cn("h-[150px] grid grid-cols-12 content-center gap-[3px] animate-pulse", className)}>
      {Array.from({length: 48}, (_, index) => (
        <div key={index} className="w-[12px] h-[12px] bg-stone-100 border rounded-[2px] border-stone-200 dark:border-stone-800 dark:bg-stone-900">
        </div>
      ))}
    </div>
  </>)
  if (bodyOnly) return body
  return (<>
    <section className="flex flex-col items-center gap-2 animate-pulse">
      <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/3"/>
      {body}
      <div className="flex self-end">
        <div className="w-20 h-[12px] bg-stone-200 dark:bg-stone-700 rounded"/>
        <span className="px-2"/>
        <div className="w-20 h-[12px] bg-stone-200 dark:bg-stone-700 rounded"/>
      </div>
    </section>
  </>)
}

export const ActivitiesPlaceholder = () => {
  return (
    <ul className="space-y-6 py-8">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex flex-col gap-2 rounded-lg animate-pulse">
          <div className="flex flex-row items-start">
            <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg bg-stone-200 dark:bg-stone-700"/>
            <div className="flex flex-col grow px-4 md:px-6 w-full">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-1/3"/>
                <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/6"/>
              </div>
              <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2 mt-2"/>
              <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-2/3 mt-2"/>
              <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded w-full mt-2 hidden md:block"/>
            </div>
          </div>
          <div className="h-16 bg-stone-200 dark:bg-stone-700 rounded w-full mt-2 md:hidden"/>
        </li>
      ))}
    </ul>
  )
}
