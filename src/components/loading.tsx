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
      {Array.from({length: 5}, (_, index) => (
        <div key={index} className="flex w-10 h-10 flex-col bg-stone-100 border rounded-md border-stone-200 dark:border-stone-800 dark:bg-stone-900">
        </div>
      ))}
    </div>
    <div className={cn("w-full h-full flex flex-row items-center gap-2 justify-center animate-pulse", className)}>
      {Array.from({length: 5}, (_, index) => (
        <div key={index} className="flex w-10 h-10 flex-col bg-stone-100 border rounded-md border-stone-200 dark:border-stone-800 dark:bg-stone-900">
        </div>
      ))}
    </div>
  </>)
}

export const ActivitiesPlaceholder = () => {
  return (
    <ul className="space-y-6 py-8">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex flex-col gap-2 rounded-lg animate-pulse">
          <div className="flex flex-row items-start">
            <div className="relative w-28 shrink-0 aspect-[0.7] rounded-lg bg-gray-200 dark:bg-gray-700"/>
            <div className="flex flex-col grow px-4 md:px-6 w-full">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"/>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"/>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2"/>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2"/>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2 hidden md:block"/>
            </div>
          </div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2 md:hidden"/>
        </li>
      ))}
    </ul>
  );
};
