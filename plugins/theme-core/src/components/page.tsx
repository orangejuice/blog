import React from "react"
import Page from "../../../../src/components/page"

type Props = {
  data: {
    page: any
    [key: string]: any
  }
}

export default function MinimalBlogCorePage({ data }: Props) {
  const { page } = data

  return <Page data={{ ...data, page }} />
}
