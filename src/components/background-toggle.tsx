"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {cn} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import React, {ComponentPropsWithoutRef, useEffect, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {useMounted} from "@/lib/use-mounted"
import {useLocalStorage} from "@/lib/use-local-storage"

export function BackgroundMusicToggle({className, small, ...props}: ComponentPropsWithoutRef<"button"> & {small?: boolean}) {
  const mounted = useMounted()
  const {resolvedTheme} = useTheme()
  const {t} = useTranslation()
  const [isWhiteNoiseOn, setWhiteNoiseOn] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = resolvedTheme == "light" ? "/white-noise-day.mp3" : "/white-noise-night.mp3"
    isWhiteNoiseOn ? void audioRef.current.play().catch(console.log) : audioRef.current.pause()
  }, [isWhiteNoiseOn, resolvedTheme])

  return (<>
    <Button variant="noStyle" className={cn("group relative h-fit w-fit gap-2 px-2 py-1.5 -mx-2 hover:bg-stone-200 active:bg-stone-300",
      "dark:hover:bg-stone-700 dark:active:bg-stone-800", className)}
      onClick={() => setWhiteNoiseOn(!isWhiteNoiseOn)}>
      <Icons.audio className={cn(!isWhiteNoiseOn && "[&_path]:[animation-play-state:paused]", small ? "h-4 w-4" : "h-5 w-5")}/>
      <AnimatePresence>
        {!isWhiteNoiseOn && (<>
          <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={cn(
            "absolute w-6 h-1 rotate-45 top-4 left-1.5 bg-red-500 rounded border border-white", small && "w-5",
            "dark:border-black group-hover:border-stone-200 dark:group-hover:border-stone-700 transition-colors")}/>
        </>)}
      </AnimatePresence>
      <span>{t("theme.white-noise")}</span>
    </Button>
    <audio ref={audioRef} className="hidden" loop={true}/>
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
      <Icons.background className={cn(small ? "h-4 w-4" : "h-5 w-5")}/>
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
