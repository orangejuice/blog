/** @jsx jsx */
import {graphql, Link} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import {Heading, jsx} from "theme-ui"
import {Box, Flex} from "@theme-ui/components"
import * as settings from "../../settings"
import kebabCase from "lodash.kebabcase"
import SectionTitle from "../components/SectionTitle"


const Tags = ({ data, pageContext }) => {
  const list = data.allPost.group

  const { tagsPath, basePath } = settings

  return (
    <Layout pageContext={pageContext}>
      <SEO title="Tags" />
      <SectionTitle>Tag</SectionTitle>
      <Heading variant="styles.h3">All tags</Heading>
      <Box mt={[4, 5]} sx={{minHeight: `400px`}}>
        {list.map((listItem) => (
          <Flex key={listItem.fieldValue} mb={[1, 1, 2]} sx={{ alignItems: `center` }}>
            <Link sx={{ variant: `links.primary`, mr: 2 }}
              to={`${basePath}${tagsPath}/${kebabCase(listItem.fieldValue)}`}>
              {listItem.fieldValue} <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </Link>
          </Flex>
        ))}
      </Box>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query($locale: String!) {
    allPost(sort: { fields: tags___name, order: DESC }, filter: {locale: {eq: $locale}}) {
      group(field: tags___name) {
        fieldValue
        totalCount
      }
    }
  }
`
