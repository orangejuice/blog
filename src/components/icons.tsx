import * as React from "react"
import {ComponentProps, ComponentType} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, AudioLines, ChevronRight, Dot, Filter, Globe, Hash, Loader2, LogIn, LogOut, LucideProps, Menu, MessageCircleMore, Monitor, Moon, Pickaxe, Slash, Smile, Sun, Undo2, User} from "lucide-react"
import Image, {ImageProps} from "next/image"

export const Icons = {
  logo: (props: Partial<ImageProps>) => <Image src="/logo.svg" width={140} height={30} alt="Logo" priority {...props}/>,
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  symbol: {hash: cns(Hash), slash: cns(Slash), dot: cns(Dot), building: cns(Pickaxe)},
  filter: cns(Filter),
  post: {reaction: cns(Smile), comment: cns(MessageCircleMore), goBack: cns(Undo2)},
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2, "w-5 h-5 mx-auto animate-spin"),
  nav: {profile: cns(User), lang: cns(Globe), menu: cns(Menu)},
  theme: {light: cns(Sun), dark: cns(Moon), system: cns(Monitor)},
  grid: () => (<>
    <span className="grid grid-cols-1 grid-rows-2 gap-px">
      <span className="animate-fade mx-px h-1 w-1 rounded-full bg-current"></span>
      <span className="animate-fade animate-delay-300 mx-px h-1 w-1 rounded-full bg-current"></span>
    </span>
  </>),
  audio: ({className, ...props}: LucideProps) =>
    <AudioLines className={cn("[&_path]:animate-wave [&_path:nth-child(odd)]:animate-delay-300", className)} {...props}/>
}

function cns<T extends ComponentType<any>>(Icon: T, predefined?: string) {
  // eslint-disable-next-line react/display-name
  return ({className, ...props}: ComponentProps<T>) =>
    // @ts-ignore
    <Icon className={cn("h-4 w-4 shrink-0", predefined, className)} {...props} />
}
