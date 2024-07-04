"use client"
import {create} from "zustand"

const storeDict = new Map<string, any>()

const getGlobalStore = <T>(key: string, initialValue: T) => {
  !storeDict.has(key) && storeDict.set(key, create<UseState<T>>((set, get) => ({
    value: initialValue,
    setValue: (update) => {
      const newValue = typeof update === "function" ? (update as (prev: T) => T)(get().value) : update
      set({value: newValue})
    }
  })))

  return storeDict.get(key)
}

export const useGlobalState = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const store = getGlobalStore(key, initialValue)
  const {value, setValue} = store()

  return [value, setValue]
}
