"use server"
import axios from "axios"
import {revalidator} from "@/app/actions"

export async function incrementViews(slug: string) {
  const response = await axios.post(`${process.env.POST_METADATA_API}/${slug}/increment`, {})
  const {data} = response.data
  void revalidator()
  return data[0] as {slug: string, view: number}
}
