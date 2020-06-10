/** @jsx jsx */
import {jsx} from "theme-ui"
import * as React from 'react'
import styled from '@emotion/styled'
import LocalizedLink from "./LocalizedLink";
import Tags from "./Tags";
import {FormattedDate, FormattedMessage} from "react-intl";


const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
`

const Title = styled.h1`
  position: relative;
  text-shadow: 0 5px 15px rgba(0,0,0,0.15);
  margin-bottom: 0.75rem;
  color: secondary;

  a{
    border-bottom: 2px solid transparent;
  }
  a:hover{
    border-bottom: 2px solid;
  }
`

const Initiale = styled.span`
  position: absolute;
  font-size: 7rem;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  user-select: none;
  z-index: -1;
`

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const ListItem = ({post}) => {

  const {title, date, excerpt, slug, timeToRead, tags} = post
  const firstChar = title.charAt(0);

  return (
    <Post>
      <Title>
        <Initiale>{firstChar}</Initiale>
        <LocalizedLink to={slug} sx={{color: `text`}}>{title}</LocalizedLink>
      </Title>
      <div sx={{color: t => t.colors.secondary}}>
        {tags && (
          <React.Fragment>
            <Tags tags={tags}/>
            {` — `}
          </React.Fragment>
        )}
        <FormattedDate month="long" year="numeric" day="numeric" value={date}/>
        &nbsp;&mdash;&nbsp;
        <FormattedMessage id={"post.timeToRead"} values={{timeToRead}}/>
      </div>
      <Excerpt>{excerpt}</Excerpt>
    </Post>
  )
}

export default ListItem;
