/** @jsx jsx */
import {jsx} from "theme-ui";
import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'gatsby';


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

const Description = styled.div`
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.colors.secondary};
  ${props => props.sectionTitle && 'margin-top: -3rem'};
  ${props => props.sectionTitle && 'margin-bottom: 4rem'};
  ${props => props.sectionTitle && 'text-align: center'};
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

const Article = ({ title, date, excerpt, slug, timeToRead }) => {
  const firstChar = title.charAt(0);

  return (
    <Post>
      <Title >
        <Initiale>{firstChar}</Initiale>
        <Link to={slug} sx={{color: `text`}}>{title}</Link>
      </Title>
      <Description>
        {date} &mdash; {timeToRead} Min Read
      </Description>
      <Excerpt>{excerpt}</Excerpt>
    </Post>
  );
};

export default Article;
