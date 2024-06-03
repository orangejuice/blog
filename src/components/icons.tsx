import * as React from "react"
import {ComponentProps, ComponentType} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, ChevronRight, Dot, Eye, Filter, Globe, Hash, Heart, Laugh, Loader2, LogIn, LogOut, Meh, Menu, MessageCircleMore, Monitor, Moon, PartyPopper, Pickaxe, Rocket, Slash, Smile, Sun, ThumbsDown, ThumbsUp, User} from "lucide-react"
import Image, {ImageProps} from "next/image"

export const Icons = {
  logo: (props: Partial<ImageProps>) => <Image src="/logo.svg" width={140} height={30} alt="Logo" priority {...props}/>,
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  symbol: {hash: cns(Hash), slash: cns(Slash), dot: cns(Dot), building: cns(Pickaxe)},
  filter: cns(Filter),
  emojis: {thumbUp: cns(ThumbsUp), thumbDown: cns(ThumbsDown), laugh: cns(Laugh), hooray: cns(PartyPopper), confused: cns(Meh), love: cns(Heart), rocket: cns(Rocket), eye: cns(Eye)},
  post: {reaction: cns(Smile), comment: cns(MessageCircleMore)},
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2, "mx-auto animate-spin"),
  nav: {profile: cns(User), lang: cns(Globe), menu: cns(Menu)},
  theme: {light: cns(Sun), dark: cns(Moon), system: cns(Monitor)}
}

function cns<T extends ComponentType<any>>(Icon: T, predefined?: string) {
  // eslint-disable-next-line react/display-name
  return ({className, ...props}: ComponentProps<T>) =>
    // @ts-ignore
    <Icon className={cn("h-4 w-4 shrink-0", predefined, className)} {...props} />
}