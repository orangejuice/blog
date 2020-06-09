import * as React from "react"
import * as settings from "../../settings"
import LocalizedLink from "./LocalizedLink";

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}

const Tags = ({tags}: TagsProps) => {
  const {tagsPath} = settings

  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `, `}
          <LocalizedLink to={`${tagsPath}/${tag.slug}`}>
            {tag.name}
          </LocalizedLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default Tags
