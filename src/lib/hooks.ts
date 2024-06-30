import {useEffect, useState} from "react"

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {setMounted(true)}, [])
  return mounted
}

export const useDeviceType = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (!window) return
    const handleWindowSizeChange = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowSizeChange)
    return () => window.removeEventListener("resize", handleWindowSizeChange)
  }, [])

  const isMobile = width <= 768
  const isTablet = width <= 1024
  const isDesktop = width > 1024

  return {isMobile, isTablet, isDesktop}
}
