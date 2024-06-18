import {useEffect, useState} from "react"

export const useLocalStorage = <T>(key: string, initialValue: T, options = {event: true}): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : initialValue
      } catch (error) {
        console.log(error)
      }
    }
    return initialValue
  })

  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue(prevValue => {
      const valueToStore = value instanceof Function ? value(prevValue) : value
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          if (options.event) window.dispatchEvent(new CustomEvent("localStorageChange", {detail: {key, value: valueToStore}}))
        } catch (error) {
          console.log(error)
        }
      }
      return valueToStore
    })
  }

  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === key) {
        // Addressing next.js warning, as suggested by ChatGPT
        // Cannot update a component (`PostList`) while rendering a different component (`LangSelect`).
        setTimeout(() => setStoredValue(event.detail.value), 0)
      }
    }
    if (options.event) window.addEventListener("localStorageChange", handleStorageChange as EventListener)
    if (options.event) return () => window.removeEventListener("localStorageChange", handleStorageChange as EventListener)
  }, [key])

  return [storedValue, setValue]
}
