/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import {Heading, jsx} from "theme-ui"
import {Box, Flex} from "@theme-ui/components"
import * as settings from "../../settings"
import kebabCase from "lodash.kebabcase"
import SectionTitle from "../components/SectionTitle"
import LocalizedLink from "../components/LocalizedLink"
import {FormattedMessage} from "react-intl"


const Tags = ({data, pageContext}) => {
  const list = data.allPost.group

  const {tagsPath} = settings

  return (
    <Layout pageContext={pageContext}>
      <SEO titleId="header.nav.tags"/>
      <SectionTitle><FormattedMessage id={"header.nav.tag"}/></SectionTitle>
      <Heading variant="styles.h3"><FormattedMessage id={"header.nav.tags"}/></Heading>
      <Box mt={[4, 5]} sx={{minHeight: `600px`}}>
        {list.map((listItem) => (
          <Flex key={listItem.fieldValue} mb={[1, 1, 2]} sx={{alignItems: `center`}}>
            <LocalizedLink sx={{variant: `links.primary`, mr: 2}}
                           to={`${tagsPath}/${kebabCase(listItem.fieldValue)}`}>
              {listItem.fieldValue} <span sx={{color: `secondary`}}>({listItem.totalCount})</span>
            </LocalizedLink>
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
