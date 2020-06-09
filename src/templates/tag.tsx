/** @jsx jsx */
import {graphql, Link} from "gatsby"
import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {Flex} from "@theme-ui/components";
import {Heading, jsx} from "theme-ui";
import * as settings from "../../settings"
import SectionTitle from "../components/SectionTitle";
import styled from "@emotion/styled";
import Pagination from "../components/Pagination";
import Article from "../components/Article";

const Content = styled.div`
  //grid-column: 1;
  //box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem 1rem;
  //overflow: hidden;
`;
const Tag = ({data, pageContext}: TagProps) => {
  const posts = data.allPost.nodes
  const {tagsPath, basePath} = settings
  const {currentPage, totalPage, totalPost} = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPage
  const tagBasePath = settings.tagsPath + "/" + pageContext.name
  const prevPage = tagBasePath + (currentPage - 1 === 1 ? '/' : currentPage - 1)
  const nextPage = tagBasePath + "/" + (currentPage + 1)

  return (
    <Layout>
      <SEO title={`Tag: ${pageContext.name}`}/>
      <Flex sx={{alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap`}}>
        <SectionTitle>Tag</SectionTitle>
        <Link sx={{variant: `links.secondary`}} to={`${basePath}${tagsPath}`}>
          View all tags
        </Link>
      </Flex>
      <Heading variant="styles.h3">{pageContext.name}</Heading>
      <p sx={{color: `secondary`, mt: 3, a: {color: `secondary`}, fontSize: [1, 1, 1]}}>
        {totalPost} posts in total
      </p>
      <Content>
        {posts.map(post => (
          <Article
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            timeToRead={post.timeToRead}
            slug={post.slug}
            key={post.slug}
          />
        ))}
      </Content>
      <Pagination first={isFirst} last={isLast} prev={prevPage} next={nextPage}
                  current={currentPage} total={totalPage}/>
    </Layout>
  )
}

export default Tag

export const query = graphql`
  query($slug: String!, $formatString: String!, $skip: Int!, $limit: Int!) {
    allPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt(truncate: true)
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`

type TagProps = {
  data: {
    allPost: {
      nodes: {
        slug: string
        title: string
        date: string
        excerpt: string
        description: string
        timeToRead?: number
        tags: {
          name: string
          slug: string
        }[]
      }[]
    }
  }
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
}
