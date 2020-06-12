/** @jsx jsx */
import {jsx} from "theme-ui"
import * as React from "react"
import * as settings from "../../settings"
import LocalizedLink from "./LocalizedLink";

const Tags = (props) => {
  const {className, tags} = props
  const {tagsPath} = settings

  return (
    <span className={className}>
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && ` , `}
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
    </span>
  )
}

export default Tags

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}
