"use server"
import {revalidatePath} from "next/cache"
import axios from "axios"
import {getActivities} from "@/lib/fetch-activity"
import {FilterOption} from "@/components/activity-filter"
import {getMetadata} from "@/lib/fetch-db"
import {SiteLocale} from "@/site"

export async function revalidator() {
  revalidatePath("/", "layout")
}

export async function incrementViews(slug: string) {
  const response = await axios.post(`${process.env.POST_METADATA_API}/${slug}/increment`, {})
  const {data} = response.data
  void revalidator()
  return data[0] as {slug: string, view: number}
}

export async function getViews(slug: string) {
  return (await getMetadata([slug]))[slug]
}

export async function fetchActivities({page, filter, locale}: {page: number, filter: FilterOption, locale: SiteLocale}) {
  return await getActivities({page, filter, locale})
}
