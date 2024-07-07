import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react"

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
  setMusicSource: (src: string) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

export const AudioProvider = ({children, initialSource = "", fadeDuration = 1000}: {children: ReactNode, initialSource?: string, fadeDuration?: number}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [audioSource, setAudioSource] = useState<string>(initialSource)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)
  const isFadingRef = useRef<boolean>(false)

  const fadeAudio = (start: number, end: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    const startTime = performance.now()
    const changeInVolume = end - start

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    isFadingRef.current = true

    fadeIntervalRef.current = window.setInterval(() => {
      const elapsedTime = performance.now() - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      audio.volume = start + changeInVolume * progress

      if (progress === 1) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        isFadingRef.current = false
        if (onComplete) onComplete()
      }
    }, 16)
  }

  useEffect(() => {
    audioRef.current = new Audio(audioSource)
    const audio = audioRef.current
    audio.loop = true
    const handleTimeUpdate = () => {
      if (!audio || isFadingRef.current) return
      const timeRemaining = audio.duration - audio.currentTime
      if (timeRemaining <= fadeDuration / 1000) {
        fadeAudio(1, 0, timeRemaining * 1000, () => {
          audio.currentTime = 0
          fadeAudio(0, 1, fadeDuration)
        })
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.pause()
      audioRef.current = null
    }
  }, [audioSource, fadeDuration])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      fadeAudio(audio.volume, 0, fadeDuration, () => {audio.pause()})
      setIsPlaying(false)
    } else {
      audio.play().then(() => fadeAudio(0, 1, fadeDuration))
      setIsPlaying(true)
    }
  }

  const setMusicSource = (src: string) => {
    const audio = audioRef.current
    if (!audio || src == audioSource) return
    fadeAudio(audio.volume, 0, fadeDuration, () => {
      audio.pause()
      setAudioSource(src)
      setIsPlaying(false)
    })
  }

  return <AudioContext.Provider value={{isPlaying, toggleAudio, setMusicSource}}>{children}</AudioContext.Provider>
}
