/** @jsx jsx */
import {jsx, useColorMode} from "theme-ui"
import React, {useEffect} from 'react'


const src = 'https://utteranc.es/client.js'
const branch = 'master'
const DARK_THEME = 'photon-dark'
const LIGHT_THEME = 'github-light'

export const Utterances = ({repo, slug}) => {
  const rootElm = React.createRef()
  const [colorMode] = useColorMode()

  useEffect(() => {
    const isDarkTheme = colorMode === `dark`
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
      label: 'comment',
      async: true,
      'issue-term': slug,
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  }, [])

  return <div sx={{ ".utterances":{ maxWidth: `100% !important`}}} ref={rootElm}/>
}
