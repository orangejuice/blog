import {createGlobalState} from "react-hooks-global-state"
import {useEffect, useState} from "react"

export const {useGlobalState} = createGlobalState({
  interactions: {} as {[slug: string]: { [key in "comment" | "reaction"]: number }}
})

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {setMounted(true)}, [])
  return mounted
}