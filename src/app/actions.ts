"use server"
import {revalidatePath} from "next/cache"

export async function revalidator() {
  revalidatePath("/", "layout")
}
