import {useEffect, useState} from "react"

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      window.dispatchEvent(new CustomEvent("localStorageChange", {detail: {key, value}}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.value)
      }
    }
    window.addEventListener("localStorageChange", handleStorageChange as EventListener)
    return () => window.removeEventListener("localStorageChange", handleStorageChange as EventListener)
  }, [key])

  return [storedValue, setValue]
}