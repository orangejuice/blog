import {cn} from "@/lib/utils"

export const BounceBackground = () => {
  return (<>
    <span className={cn("absolute inset-1 -z-10 rounded-xl bg-stone-100 opacity-0 transition-all duration-200 ease-bounce",
      "group-hover:-inset-1 dark:bg-neutral-800 group-hover:opacity-100 group-active:bg-stone-200 group-active:dark:bg-neutral-700")}></span>
  </>)
}
