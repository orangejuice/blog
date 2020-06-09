/** @jsx jsx */
import {graphql} from "gatsby"
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {Heading, jsx} from "theme-ui";
import {MDXRenderer} from "gatsby-plugin-mdx";

type PageProps = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
      body: string
    }
  }
}

const Page = ({data}: PageProps) => {
  const {page} = data
  return (
    <Layout>
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
// export default PageComponent

export const query = graphql`
  query($slug: String!) {
    page(slug: { eq: $slug }) {
      title
      slug
      excerpt(truncate: true)
      body
    }
  }
`
