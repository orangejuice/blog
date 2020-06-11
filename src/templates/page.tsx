/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import {Heading, jsx} from "theme-ui"
import {MDXRenderer} from "gatsby-plugin-mdx"


const Page = ({data, pageContext}) => {
  const {page} = data
  return (
    <Layout pageContext={pageContext}>
      <SEO title={page.title} description={page.excerpt}/>
      <Heading variant="styles.h2">{page.title}</Heading>
      <section sx={{my: 5}}>
        <MDXRenderer>{page.body}</MDXRenderer>
      </section>
    </Layout>
  )
}

export default Page

// const PageComponent = props => {
//     const { page } = props.data
//
//     return <Page data={{...props.data, page}} />
// }
//
// export defaultLocale PageComponent

export const query = graphql`
  query($slug: String!, $locale: String!) {
    page(slug: { eq: $slug }, locale: {eq: $locale}) {
      title
      slug
      excerpt(truncate: true)
      body
    }
  }
`
