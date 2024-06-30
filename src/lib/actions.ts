"use server"
import {revalidatePath} from "next/cache"
import axios from "axios"
import {getActivities} from "@/lib/fetch-activity"
import {FilterOption} from "@/components/activity-filter"

export async function revalidator() {
  revalidatePath("/", "layout")
}

export async function incrementViews(slug: string) {
  const response = await axios.post(`${process.env.POST_METADATA_API}/${slug}/increment`, {})
  const {data} = response.data
  void revalidator()
  return data[0] as {slug: string, view: number}
}

export async function fetchActivities(pages: number[], filter: FilterOption) {
  return await Promise.all(pages.map(page => getActivities(page, filter)))
    .then(pages => pages.flat())
}
