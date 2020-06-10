/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SectionTitle from "../components/SectionTitle"
import ListItem from "../components/ListItem"
import Pagination from "../components/Pagination"
import {Flex} from "@theme-ui/components"
import {jsx} from "theme-ui"
import * as settings from "../../settings"
import LocalizedLink from "../components/LocalizedLink"
import {FormattedMessage} from "react-intl";


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
        <SectionTitle><FormattedMessage id={"header.nav.home"}/></SectionTitle>
        <LocalizedLink sx={{variant: `links.secondary`}} to={tagsPath}>
          <FormattedMessage id={"header.nav.allTags"}/>
        </LocalizedLink>
      </Flex>
      <div sx={{padding: `1rem 2rem`}}>
        {posts.map(post => (
          <ListItem post={post}/>
        ))}
      </div>
      <Pagination first={isFirst} last={isLast} prev={prevPage} next={nextPage}
                  current={currentPage} total={numPages}/>
    </Layout>
  )
}

export default Homepage

export const query = graphql`
  query($skip: Int!, $limit: Int!, $locale: String!) {
    allPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip, filter: {locale: {eq: $locale}}) {
      nodes {
        slug
        title
        date
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
