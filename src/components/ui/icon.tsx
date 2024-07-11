import * as React from "react"
import {ComponentProps, ComponentPropsWithoutRef, ComponentType, forwardRef} from "react"
import {cn} from "@/lib/utils"
import {ArrowRight, AudioLines, ChevronRight, CircleAlert, Dot, Filter, Globe, Hash, Loader2, LogIn, LogOut, Menu, MessageCircleHeart, MessageCircleMore, Moon, Slash, Smile, Square, SquareCheckBig, Sun, SunMoon, Undo2, User} from "lucide-react"
import Image, {ImageProps} from "next/image"
import {Book, BookmarkSimple, Eye, FilmReel, GithubLogo, SelectionBackground} from "@phosphor-icons/react/dist/ssr"

export const Icon = {
  account: {signIn: cns(LogIn), signOut: cns(LogOut)},
  audio: cns(AudioLines, "w-5 h-5 [&_path]:animate-wave [&_path:nth-child(odd)]:animate-delay-300"),
  background: cns((props) => <SelectionBackground weight="duotone" {...props}/>),
  filter: cns(Filter),
  github: cns((props) => <GithubLogo weight="bold" {...props}/>),
  link: {arrow: cns(ArrowRight), chevron: cns(ChevronRight)},
  loading: cns(Loader2, "w-5 h-5 mx-auto animate-spin"),
  loadingGrid: ({className, ...props}: ComponentPropsWithoutRef<"span">) => (<>
    <span className={cn("grid justify-items-center grid-cols-1 grid-rows-2 gap-px", className, "h-fit")} {...props}>
      <span className="animate-fade mx-px h-1 w-1 rounded-full bg-current"></span>
      <span className="animate-fade animate-delay-300 mx-px h-1 w-1 rounded-full bg-current"></span>
    </span>
  </>),
  logo: (props: Partial<ImageProps>) => <Image src="/logo.svg" width={140} height={30} alt="Logo" priority {...props}/>,
  nav: {profile: cns(User), lang: cns(Globe), menu: cns(Menu)},
  post: {
    view: cns((props) => <Eye weight="bold" {...props}/>),
    viewFilled: cns((props) => <Eye weight="fill" {...props}/>),
    reaction: cns(Smile), comment: cns(MessageCircleMore),
    goBack: cns(Undo2), reactComment: cns(MessageCircleHeart)
  },
  symbol: {
    hash: cns(Hash), slash: cns(Slash), dot: cns(Dot), alert: cns(CircleAlert),
    square: cns(Square), squareChecked: cns(SquareCheckBig, "[&_path:first-child]:stroke-[3px]")
  },
  theme: {light: cns(Sun, "w-full h-full"), dark: cns(Moon, "w-full h-full"), system: cns(SunMoon, "w-full h-full")},
  type: {
    book: cns((props) => <Book weight="fill" {...props}/>),
    movie: cns((props) => <FilmReel weight="fill" {...props}/>),
    bookFlag: cns(() =>
      <BookmarkSimple weight="fill" style={{color: `var(--color-book-3)`}}/>, "w-5 h-5 top-0 right-0"),
    movieFlag: cns(() =>
      <BookmarkSimple weight="fill" style={{color: `var(--color-movie-3)`}}/>, "w-5 h-5 top-0 right-0")
  }
}

function cns<T extends ComponentType<any>>(Component: T, predefined?: string) {
  return forwardRef(function Icon({className, ...props}: ComponentProps<T>, ref) {
    // @ts-ignore
    return <Component className={cn("h-4 w-4 shrink-0", predefined, className)} {...props} ref={ref}/>
  })
}
