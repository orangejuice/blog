/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import SectionTitle from "../components/SectionTitle"
import ListItem from "../components/ListItem"
import Pagination from "../components/Pagination"
import {Flex} from "@theme-ui/components"
import {jsx} from "theme-ui"
import * as settings from "../../settings"
import LocalizedLink from "../components/LocalizedLink"

const Content = styled.div`
  //grid-column: 1;
  //box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem 1rem;
  //overflow: hidden;
`;

const Homepage = ({data, pageContext}) => {
  const posts = data.allPost.nodes
  const {tagsPath} = settings
  const {currentPage, numPages} = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout pageContext={pageContext}>
      <Flex sx={{alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap`}}>
        <SectionTitle>Blog</SectionTitle>
        <LocalizedLink sx={{variant: `links.secondary`}} to={tagsPath}>
          View all tags
        </LocalizedLink>
      </Flex>
      <Content>
        {posts.map(post => (
          <ListItem
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
                  current={currentPage} total={numPages}/>
    </Layout>
  )
}

export default Homepage

export const query = graphql`
  query($formatString: String!, $skip: Int!, $limit: Int!, $locale: String!) {
    allPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip, filter: {locale: {eq: $locale}}) {
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
