"use client"
import confetti from "canvas-confetti"
import {type MouseEvent, useEffect, useState} from "react"
import {useMounted} from "@/lib/hooks"
import {Counters, ReactionName, reactionsSetup} from "@/components/reactions"
import {useWindowDimensions} from "@/lib/use-window-dimensions"


type ReactedLocalStorage = { [Key in ReactionName]?: boolean };

export const useReactions = (slug: string, initialCounters?: Counters) => {
  const hasMounted = useMounted()
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()

  const [submitting, setSubmitting] = useState<ReactionName | undefined>(
    undefined
  )

  const [counters, setCounters] = useState<Counters>(initialCounters || {})
  const [reacted, setReacted] = useState<ReactedLocalStorage>({})

  useEffect(() => {
    if (!hasMounted) return
    // Get if it has reacted before (locally)
    const data = window.localStorage.getItem(slug)
    if (data) {
      try {
        const json = JSON.parse(data) as ReactedLocalStorage
        setReacted(json)
      } catch (e) {}
    }
    // Cleanup confetti
    return () => {
      try {
        confetti.reset()
      } catch (e) {}
    }
  }, [hasMounted, slug])

  const onButtonClick = async (event: MouseEvent<HTMLButtonElement>, reaction: ReactionName) => {
    const x = event.clientX / windowWidth
    const y = event.clientY / windowHeight
    confetti({
      spread: 60,
      scalar: 0.5,
      gravity: 0.85,
      decay: 0.75,
      ticks: 100,
      origin: {x, y},
      colors: [reactionsSetup[reaction].color]
    })
  }

  return {onButtonClick, submitting, reacted, counters}
}