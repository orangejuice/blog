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
  @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap');
  font-family: 'Zhi Mang Xing', cursive;
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

const PostList = ({posts}) => {

  return (
    <React.Fragment>
      {posts.map(post => (
        <Post sx={{padding: `1em 2em`}}>
          <Title>
            <Initiale>{post.title.charAt(0)}</Initiale>
            <LocalizedLink to={post.slug} sx={{color: `text`}}>{post.title}</LocalizedLink>
          </Title>
          <div sx={{color: t => t.colors.secondary}}>
            {post.tags && <Tags tags={post.tags} sx={{marginRight: `20px`}}/>}
            <FormattedDate month="long" year="numeric" day="numeric" value={post.date}/>
            &nbsp;&mdash;&nbsp;
            <FormattedMessage id={"post.timeToRead"} values={{timeToRead: post.timeToRead}}/>
          </div>
          <Excerpt>{post.excerpt}</Excerpt>
        </Post>))}
    </React.Fragment>
  )
}

export default PostList;
