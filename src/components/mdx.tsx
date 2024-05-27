"use client"

import {Post} from "contentlayer/generated"
import {useMDXComponent} from "next-contentlayer2/hooks"
import type {MDXComponents} from "mdx/types"

export function MDX({post, components}: {post: Post, components?: MDXComponents}) {
  const MDXContent = useMDXComponent(post.body.code)
  return <MDXContent components={components}/>
}