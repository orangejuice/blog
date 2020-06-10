/** @jsx jsx */
import {jsx} from "theme-ui"
import * as React from "react"
import * as settings from "../../settings"
import LocalizedLink from "./LocalizedLink";

const Tags = ({tags}: TagsProps) => {
  const {tagsPath} = settings

  return (
    <React.Fragment>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `, `}
          <LocalizedLink sx={{
            color: `tagColor`,
            backgroundColor: `tagBackground`,
            fontSize: `0`,
            borderRadius: `3px`,
            padding: `2px 6px`,
          }} to={`${tagsPath}/${tag.slug}`}>
            {tag.name}
          </LocalizedLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default Tags

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}
