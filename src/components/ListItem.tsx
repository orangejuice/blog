/** @jsx jsx */
import {jsx} from "theme-ui"
import * as React from 'react'
import styled from '@emotion/styled'
import LocalizedLink from "./LocalizedLink";


const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
`;

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
`;

const Initiale = styled.span`
  position: absolute;
  font-size: 7rem;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  user-select: none;
  z-index: -1;
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ListItem = ({ title, date, excerpt, slug, timeToRead }) => {
  const firstChar = title.charAt(0);

  return (
    <Post>
      <Title >
        <Initiale>{firstChar}</Initiale>
        <LocalizedLink to={slug} sx={{color: `text`}}>{title}</LocalizedLink>
      </Title>
      <div sx={{color: t => t.colors.secondary}}>
        {date} &mdash; {timeToRead} Min Read
      </div>
      <Excerpt>{excerpt}</Excerpt>
    </Post>
  );
};

export default ListItem;
