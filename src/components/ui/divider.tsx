import {ComponentPropsWithoutRef} from "react"

export const Divider = ({text}: ComponentPropsWithoutRef<"div"> & {text: string}) => {
  return (<>
    <div className="flex items-center py-5 w-full">
      <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
      <span className="shrink mx-2 text-stone-400 dark:text-stone-600 text-sm">{text}</span>
      <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
    </div>
  </>)
}
