import React from "react"
import {preToCodeBlock} from "mdx-utils"
import Code from "../components/code"

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <Code {...props} />
    }
    return <pre {...preProps} />
  },
}

export default components
