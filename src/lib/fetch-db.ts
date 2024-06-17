import axios from "axios"

export const getPostMetadata = async (slugs: string[]) => {
  try {
    const response = await axios.post(process.env.POST_METADATA_API!, {slugs})
    const {data} = await response.data
    return data.reduce((acc: GetPostMetadataResponse, {slug, ...item}: {slug: string, view: number}) => {
      acc[slug] = item
      return acc
    }, {})
  } catch (error) {
    console.error(error)
    throw error
  }
}

export type GetPostMetadataResponse = {
  [slug: string]: {
    view: number
  }
}
