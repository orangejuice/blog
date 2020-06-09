/** @jsx jsx */
import {graphql} from "gatsby"
import React from "react"
import Layout from "../components/layout";
import SEO from "../components/seo";
import SectionTitle from "../components/SectionTitle";
import {Heading, jsx} from "theme-ui";
import ItemTags from "../components/item-tags";
import {MDXRenderer} from "gatsby-plugin-mdx";
import CodeStyles from "../styles/code";

type PostProps = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      body: string
      excerpt: string
      timeToRead?: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

const Post = ({data}: PostProps) => {
  const {post} = data

  const px = [`32px`, `16px`, `8px`, `4px`]
  const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

  return (
    <Layout sx={{ ...CodeStyles }}>
      <SEO
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
        pathname={post.slug}
      />
      <SectionTitle>Post</SectionTitle>
      <Heading variant="styles.h3">{post.title}</Heading>
      <p sx={{color: `secondary`, mt: 3, a: {color: `secondary`}, fontSize: [1, 1, 1]}}>
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags}/>
          </React.Fragment>
        )}
        {post.timeToRead && ` — `}
        {post.timeToRead && <span>{post.timeToRead} min read</span>}
      </p>
      <section sx={{my: 5, ".gatsby-resp-image-wrapper": {my: [4, 4, 5], boxShadow: shadow.join(`, `)}}}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    post(slug: { eq: $slug }) {
      slug
      title
      date(formatString: $formatString)
      tags {
        name
        slug
      }
      description
      body
      excerpt(truncate: true)
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
