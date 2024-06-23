"use server"
import {revalidatePath} from "next/cache"
import axios from "axios"

export async function revalidator() {
  revalidatePath("/", "layout")
}

export async function incrementViews(slug: string) {
  const response = await axios.post(`${process.env.POST_METADATA_API}/${slug}/increment`, {})
  const {data} = response.data
  void revalidator()
  return data[0] as {slug: string, view: number}
}
