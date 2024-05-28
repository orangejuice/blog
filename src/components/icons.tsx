import {ComponentProps, ComponentType} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, ChevronRight, Hash, Loader2, LogIn, LogOut, Monitor, Moon, Sun, User} from "lucide-react"

export const Icons = {
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  hash: cns(Hash),
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2),
  nav: {profile: cns(User)},
  theme: {light: cns(Sun), dark: cns(Moon), system: cns(Monitor)}
}

function cns<T extends ComponentType<any>>(Icon: T, predefined?: string) {
  // eslint-disable-next-line react/display-name
  return ({className, ...props}: ComponentProps<T>) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    <Icon className={cn("h-4 w-4 shrink-0", predefined, className)} {...props} />
}