/** @jsx jsx */
import {graphql} from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SectionTitle from "../components/SectionTitle"
import {Heading, jsx} from "theme-ui"
import {MDXRenderer} from "gatsby-plugin-mdx"
import {FormattedMessage} from "react-intl"
import {Utterances} from "../components/Comment"
import {TitleMeta} from "../components/TitleMeta";


const Post = ({data, pageContext}) => {
  const {post} = data

  const px = [`32px`, `16px`, `8px`, `4px`]
  const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

  return (
    <Layout pageContext={pageContext} sx={{minHeight: `600px`}}>
      <SEO
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
      />
      <SectionTitle><FormattedMessage id={"header.nav.post"}/></SectionTitle>
      <Heading variant="styles.h1">{post.title}</Heading>
      <TitleMeta post={post} sx={{
        display: `flex`,
        flexDirection: [`column`, `row`],
        lineHeight: [2, 3],
      }}/>
      <section sx={{
        my: 5,
        ".gatsby-resp-image-wrapper": {my: [4, 4, 4], boxShadow: shadow.join(`, `)},
        ".gatsby-resp-image-figcaption": {fontSize: 1, textAlign: `center`, mb: 3}
      }}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
      <Utterances repo="orangejuice/blog" slug={post.slug}/>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($slug: String!, $locale: String!) {
    post(slug: { eq: $slug }, locale: {eq: $locale}) {
      slug
      title
      date
      tags {
        name
        slug
      }
      description
      body
      excerpt
      timeToRead
      banner {
        childImageSharp {
          resize(width: 1200, quality: 90) {
            src
          }
        }
      }
    }
  }
`
