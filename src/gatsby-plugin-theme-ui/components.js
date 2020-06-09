import React from "react"
import {preToCodeBlock} from "mdx-utils"
import Code from "../components/code"
import LocalizedLink from "../components/LocalizedLink";

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <Code {...props} />
    }
    return <pre {...preProps} />
  },
  a: props => <LocalizedLink to={props.href} {...props}/>
}

export default components
