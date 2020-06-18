/** @jsx jsx */
import {jsx, useColorMode} from "theme-ui"


export const Utterances = ({repo, slug}) => {
  const [colorMode] = useColorMode()
  const isDarkTheme = colorMode === `dark`

  return (
    <section sx={{".utterances": {maxWidth: `100% !important`}}}
      ref={elem => {
        if (!elem) return
        elem.firstChild && elem.removeChild(elem.firstChild)
        const scriptElem = document.createElement("script")
        scriptElem.src = "https://utteranc.es/client.js"
        scriptElem.async = true
        scriptElem.crossOrigin = "anonymous"
        scriptElem.setAttribute("repo", repo)
        scriptElem.setAttribute("issue-term", slug)
        scriptElem.setAttribute("label", "blog-comment")
        scriptElem.setAttribute("theme", isDarkTheme ? "dark-blue" : "github-light")
        elem.appendChild(scriptElem)
      }}
    />
  )
}