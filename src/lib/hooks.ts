import {createGlobalState} from "react-hooks-global-state"
import {useEffect, useState} from "react"

export const {useGlobalState} = createGlobalState({
  interactions: {} as Interactions
})
export type Interactions = {[slug: string]: { [key in "comment" | "reaction"]: number }}

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {setMounted(true)}, [])
  return mounted
}

export const useDeviceType = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)

    return () => window.removeEventListener("resize", handleWindowSizeChange)
  }, [])

  const isMobile = width <= 768
  const isTablet = width <= 1024
  const isDesktop = width > 1024

  return {isMobile, isTablet, isDesktop}
}
