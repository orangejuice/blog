/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import {Flex} from "@theme-ui/components"
import {Heading, jsx} from "theme-ui"
import * as settings from "../../settings"
import SectionTitle from "../components/SectionTitle"
import Pagination from "../components/Pagination"
import ListItem from "../components/ListItem"
import LocalizedLink from "../components/LocalizedLink";
import {FormattedMessage} from "react-intl";


const Tag = ({data, pageContext}) => {
  const posts = data.allPost.nodes
  const {tagsPath} = settings
  const {currentPage, totalPage, totalPost} = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPage
  const tagBasePath = settings.tagsPath + "/" + pageContext.name
  const prevPage = tagBasePath + (currentPage - 1 === 1 ? '/' : currentPage - 1)
  const nextPage = tagBasePath + "/" + (currentPage + 1)

  return (
    <Layout pageContext={pageContext}>
      <SEO titleId="title.tag" titleValue={{tag: pageContext.name}}/>
      <Flex sx={{alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap`}}>
        <SectionTitle><FormattedMessage id={"header.nav.tag"}/></SectionTitle>
        <LocalizedLink sx={{variant: `links.secondary`}} to={`${tagsPath}`}>
          <FormattedMessage id={"header.nav.allTags"}/>
        </LocalizedLink>
      </Flex>
      <Heading variant="styles.h3">{pageContext.name}</Heading>
      <p sx={{color: `secondary`, mt: 3, a: {color: `secondary`}, fontSize: [1, 1, 1]}}>
        <FormattedMessage id={"tag.postsInTotal"} values={{totalPost}}/>
      </p>
      <div sx={{borderRadius: `1rem`, padding: `1rem 1rem`}}>
        {posts.map(post => (
          <ListItem post={post}/>
        ))}
      </div>
      <Pagination first={isFirst} last={isLast} prev={prevPage} next={nextPage}
                  current={currentPage} total={totalPage}/>
    </Layout>
  )
}

export default Tag

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!, $locale: String!) {
    allPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip, filter: { tags: { elemMatch: { slug: { eq: $slug } } }, locale: {eq: $locale} }) {
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
