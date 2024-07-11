"use server"
import axios from "axios"

export const getMetadata = async (slugs: string[]): Promise<GetMetadataResponse> => {
  try {
    const response = await axios.post(process.env.POST_METADATA_API!, {slugs})
    const {data} = await response.data
    return data.reduce((acc: GetMetadataResponse, {slug, ...item}: {slug: string, view: number}) => {
      acc[slug] = item
      return acc
    }, {})
  } catch (error) {
    console.error(error)
    throw error
  }
}

export type GetMetadataResponse = {
  [slug: string]: {
    view: number
  }
}
