import * as React from "react"
import {ComponentProps, ComponentType} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, ChevronRight, Dot, Filter, Globe, Hash, Loader2, LogIn, LogOut, Menu, MessageCircleMore, Monitor, Moon, Slash, Smile, Sun, User} from "lucide-react"
import Image, {ImageProps} from "next/image"

export const Icons = {
  logo: (props: Partial<ImageProps>) => <Image src="/logo.svg" width={140} height={30} alt="Logo" priority {...props}/>,
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  symbol: {hash: cns(Hash), slash: cns(Slash), dot: cns(Dot)},
  filter: cns(Filter),
  post: {reaction: cns(Smile), comment: cns(MessageCircleMore)},
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2),
  nav: {profile: cns(User), lang: cns(Globe), menu: cns(Menu)},
  theme: {light: cns(Sun), dark: cns(Moon), system: cns(Monitor)}
}

function cns<T extends ComponentType<any>>(Icon: T, predefined?: string) {
  // eslint-disable-next-line react/display-name
  return ({className, ...props}: ComponentProps<T>) =>
    // @ts-ignore
    <Icon className={cn("h-4 w-4 shrink-0", predefined, className)} {...props} />
}