import * as React from "react"
import {ComponentProps, ComponentType, forwardRef} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, AudioLines, ChevronRight, Dot, Eye, Filter, Globe, Hash, LibraryBig, Loader2, LogIn, LogOut, Menu, MessageCircleHeart, MessageCircleMore, Moon, Pickaxe, Slash, Smile, Sun, SunMoon, Undo2, User} from "lucide-react"
import Image, {ImageProps} from "next/image"
import {BookmarkSimple, FilmReel} from "@phosphor-icons/react/dist/ssr"

export const Icons = {
  logo: (props: Partial<ImageProps>) => <Image src="/logo.svg" width={140} height={30} alt="Logo" priority {...props}/>,
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  symbol: {hash: cns(Hash), slash: cns(Slash), dot: cns(Dot), building: cns(Pickaxe)},
  filter: cns(Filter),
  post: {view: cns(Eye), reaction: cns(Smile), comment: cns(MessageCircleMore), goBack: cns(Undo2), reactComment: cns(MessageCircleHeart)},
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2, "w-5 h-5 mx-auto animate-spin"),
  nav: {profile: cns(User), lang: cns(Globe), menu: cns(Menu)},
  type: {
    book: cns(({className, ...props}) => <LibraryBig className={cn("fill-current", className)} {...props}/>),
    movie: cns((props) => <FilmReel weight="fill" {...props}/>),
    bookFlag: cns(() => <BookmarkSimple weight="fill" style={{color: `var(--color-book-3)`}} className="w-5 h-5 top-0 right-0"/>),
    movieFlag: cns(() =>  <BookmarkSimple weight="fill" style={{color: `var(--color-movie-3)`}} className="w-5 h-5 top-0 right-0"/>)
  },
  theme: {light: cns(Sun, "w-5 h-5"), dark: cns(Moon, "w-5 h-5"), system: cns(SunMoon, "w-5 h-5")},
  grid: () => (<>
    <span className="grid grid-cols-1 grid-rows-2 gap-px">
      <span className="animate-fade mx-px h-1 w-1 rounded-full bg-current"></span>
      <span className="animate-fade animate-delay-300 mx-px h-1 w-1 rounded-full bg-current"></span>
    </span>
  </>),
  audio: cns(AudioLines, "w-5 h-5 [&_path]:animate-wave [&_path:nth-child(odd)]:animate-delay-300")
}

function cns<T extends ComponentType<any>>(Component: T, predefined?: string) {
  return forwardRef(function Icon({className, ...props}: ComponentProps<T>, ref) {
    // @ts-ignore
    return <Component className={cn("h-4 w-4 shrink-0 transition-colors", predefined, className)} {...props} ref={ref}/>
  })
}
