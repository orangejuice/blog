import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {CSSProperties} from "react"

export const BounceBackground = () => {
  return (<>
    <span className={cn("absolute inset-1 -z-10 rounded-xl bg-stone-100 opacity-0 transition-all duration-200 ease-bounce",
      "group-hover:-inset-1 dark:bg-neutral-800 group-hover:opacity-100 group-active:bg-stone-200 group-active:dark:bg-neutral-700")}></span>
  </>)
}

export const TranslationDisclaimer = ({style}: {style?: CSSProperties}) => {
  return (<>
    <div className="flex items-start gap-1 text-xs animate-delay-in" style={style}>
      <Icons.symbol.alert/>The content on this page has been automatically translated from Chinese using GPT-4o.
      Please be aware that there may be translation errors or inaccuracies.
    </div>
  </>)
}
