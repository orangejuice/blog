"use client"
import {useEffect} from "react"
import tocbot from "tocbot"
import "./toc.css"
import {Icons} from "@/components/icons"
import {useMounted} from "@/lib/use-mounted"
import {useTheme} from "next-themes"
import {useTranslation} from "react-i18next"

export default function Toc() {
  const mounted = useMounted()
  const {resolvedTheme} = useTheme()
  const {t} = useTranslation()

  useEffect(() => {
    mounted && tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".toc-content",
      headingSelector: "h1, h2, h3",
      orderedList: true,
      scrollSmooth: true,
      scrollSmoothDuration: 400,
      collapseDepth: 6
    })
    return () => tocbot.destroy()
  }, [mounted, resolvedTheme])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-2 [&:has(.toc:empty)_.hidden]:flex">
      <h5 className="text-slate-900 font-semibold text-sm leading-6 dark:text-slate-100">
        {t("post.toc")}
      </h5>
      <div className="hidden text-sm text-slate-600">{t("post.toc-empty")}</div>
      <section className="toc py-2 pl-2 text-slate-700 text-sm leading-6">
        <Icons.loading/>
      </section>
    </div>
  )
}
