"use client"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {cn} from "@/lib/utils"
import {useTranslation} from "react-i18next"
import React, {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"

export function BackgroundMusicToggle() {
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
    <Button variant="ghost" size="icon" className={cn("group relative h-fit w-fit gap-2 px-2 py-1.5 -mx-2 hover:bg-stone-200 active:bg-stone-300",
      "dark:hover:bg-stone-700 dark:active:bg-stone-800")}
      onClick={() => setWhiteNoiseOn(!isWhiteNoiseOn)}>
      <Icons.audio className={cn(!isWhiteNoiseOn && "[&_path]:[animation-play-state:paused]")}/>
      <AnimatePresence>
        {!isWhiteNoiseOn && <motion.span key="span" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
          className={cn("absolute w-6 h-1 rotate-45 top-4 left-2 bg-red-500 rounded",
            "border border-white dark:border-black group-hover:border-stone-200 dark:group-hover:border-stone-700 transition-colors duration-700")}/>}
        <span>{t("theme.white-noise")}</span>
      </AnimatePresence>
    </Button>
    <audio ref={audioRef} className="hidden" loop={true}/>
  </>)
}
