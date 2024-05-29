import {Link} from "@/i18n"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {cn, formatDate} from "@/lib/utils"
import {Post} from "contentlayer/generated"

export function PostItem({post}: {post: Post}) {
  return (<>
    <Link href={`/${post.slug}`} className="group flex flex-col items-start no-underline relative p-4 rounded-xl -mx-4 bg-transparent transition-colors hover:bg-amber-200/40 gap-1">
      <h2 className={cn("flex items-center gap-2 text-gray-900 dark:text-gray-100 text-xl font-bold tracking-tight",
        "underline-fade underline-fade-with-group")}>
        {post.title}
        <Icons.link.arrow className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 -translate-x-1.5 stroke-[4px] transition-all ease-in-out duration-200 transform"/>
      </h2>
      <div className="flex items-center gap-2 flex-wrap">
        {post.tags.map((tag, index) =>
          <Button key={index} variant="secondary" className={cn("h-fit truncate px-1 py-0.5 text-xs text-stone-600",
            "hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700")}>
            {tag}
          </Button>)}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {post.excerpt}
      </p>
      <p className="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">
        Posted on <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
    </Link>
  </>)
}