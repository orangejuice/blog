"use client"
import {create} from "zustand"
import {persist} from "zustand/middleware"
import {useEffect} from "react"

type StorageState<T> = {
  value: T
  setValue: (update: T | ((val: T) => T)) => void
}

const storeDict = new Map<string, any>()

const getLocalStorageStore = <T>(key: string, initialValue: T) => {
  !storeDict.has(key) && storeDict.set(key, create(persist<StorageState<T>>((set, get) => ({
    value: initialValue,
    setValue: (update) => {
      const newValue = typeof update === "function" ? (update as (prev: T) => T)(get().value) : update
      set({value: newValue})
    }
  }), {name: key})))

  return storeDict.get(key)
}

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const store = getLocalStorageStore(key, initialValue)
  const {value, setValue} = store()

  useEffect(() => {
    const handleStorageChange = () => store.persist.rehydrate()
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return [value, setValue]
}
