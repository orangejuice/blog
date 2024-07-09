"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icon} from "@/components/ui/icon"
import {cn} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import React, {ComponentPropsWithoutRef, useEffect} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {useMounted} from "@/lib/use-mounted"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useAudio} from "@/lib/audio-provider"

export function BackgroundMusicToggle({className, small, ...props}: ComponentPropsWithoutRef<"button"> & {small?: boolean}) {
  const mounted = useMounted()
  const {resolvedTheme} = useTheme()
  const {t} = useTranslation()
  const {isPlaying, toggleAudio, setMusicSource} = useAudio()

  useEffect(() => {
    if (!mounted) return
    setMusicSource(resolvedTheme == "light" ? "/white-noise-day.mp3" : "/white-noise-night.mp3")
  }, [mounted, resolvedTheme])

  return (<>
    <Button variant="noStyle" className={cn("group relative h-fit w-fit gap-2 px-2 py-1.5 -mx-2 hover:bg-stone-200 active:bg-stone-300",
      "dark:hover:bg-stone-700 dark:active:bg-stone-800", className)}
      onClick={toggleAudio}>
      <Icon.audio className={cn(!isPlaying && "[&_path]:[animation-play-state:paused]", small ? "h-4 w-4" : "h-5 w-5")}/>
      <AnimatePresence>
        {!isPlaying && (<>
          <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={cn(
            "absolute w-6 h-1 rotate-45 top-4 left-1.5 bg-red-500 rounded border border-white", small && "w-5",
            "dark:border-black group-hover:border-stone-200 dark:group-hover:border-stone-700 transition-colors")}/>
        </>)}
      </AnimatePresence>
      <span>{t("theme.white-noise")}</span>
    </Button>
  </>)
}


export function BackgroundCanvasToggle({className, small, ...props}: ComponentPropsWithoutRef<"button"> & {small?: boolean}) {
  const mounted = useMounted()
  const {t} = useTranslation()
  const [isBackgroundOn, setIsBackgroundOn] = useLocalStorage("background-canvas", true)

  return (<>
    <Button variant="noStyle" className={cn("group relative h-fit w-fit gap-2 px-2 py-1.5 -mx-2 hover:bg-stone-200 active:bg-stone-300",
      "dark:hover:bg-stone-700 dark:active:bg-stone-800", className)}
      onClick={() => setIsBackgroundOn(!isBackgroundOn)}>
      <Icon.background className={cn(small ? "h-4 w-4" : "h-5 w-5")}/>
      <AnimatePresence>
        {mounted && !isBackgroundOn && (<>
          <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={cn(
            "absolute w-6 h-1 rotate-45 top-4 left-1.5 bg-red-500 rounded border border-white", small && "w-5",
            "dark:border-black group-hover:border-stone-200 dark:group-hover:border-stone-700 transition-colors")}/>
        </>)}
      </AnimatePresence>
      <span>{t("theme.background")}</span>
    </Button>
  </>)
}
