import React from "react"
import {Link as TLink} from "theme-ui"
import {Link} from "gatsby"
import * as settings from "../../settings"

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = settings

  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `, `}
          <TLink as={Link} to={`${basePath}${tagsPath}/${tag.slug}`}>
            {tag.name}
          </TLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemTags
