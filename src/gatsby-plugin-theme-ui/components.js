import React from "react"
import {preToCodeBlock} from "mdx-utils"
import Code from "../components/Code"
import LocalizedLink from "../components/LocalizedLink"

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <Code {...props} />
    }
    return <pre {...preProps} />
  },
  a: props => {
    const {href, children} = props
    const isHash = str => /^#/.test(str)
    const isExternal = to => /^(http|https|\/\/)/.test(to)

    if (isHash(href) || isExternal(href)) {
      return <a {...props}>{children}</a>
    }
    return <LocalizedLink to={href} {...props}/>
  }
}

export default components
