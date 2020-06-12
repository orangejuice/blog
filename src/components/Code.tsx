/** @jsx jsx */
import * as React from "react"
import Highlight, {defaultProps} from "prism-react-renderer"
import LightTheme from "prism-react-renderer/themes/nightOwlLight"
import DarkTheme from "prism-react-renderer/themes/nightOwl"
import {jsx, Styled, useThemeUI} from 'theme-ui'

const Code = (props) => {
  const {codeString, language, metastring: title = ""} = props
  const {colorMode} = useThemeUI()
  const theme = colorMode == 'light' ? {...LightTheme, ...{plain: {backgroundColor: "#f7f7f7"}}} : DarkTheme

  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <React.Fragment>
          {console.log(language, className, title, props)}
          {title && (
            <div sx={{fontSize: `12px`, paddingX: 3, paddingY: 0, fontFamily: `monospace`,}}>
              <div>{title}</div>
            </div>
          )}
          <div sx={{
            position: `relative`,
            ".prism-code span": {
              fontStyle: `normal !important`,
            },
            '&:before': {
              borderRadius: `0 0 0.25rem 0.25rem`,
              color: `black`,
              fontSize: `12px`,
              letterSpacing: `0.025rem`,
              padding: `0.1rem 0.5rem`,
              position: `absolute`,
              right: `2rem`,
              textAlign: `right`,
              textTransform: `uppercase`,
              top: 0,
              content: `"${language}"`,
              background: `${mapping[language] || "#fff"}`,
            },
          }}>
            <Styled.pre className={className} style={style} sx={{overflow: `auto`}}>
              {tokens.map((line, i) => (
                <div {...getLineProps({line, key: i})}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({token, key})} />
                  ))}
                </div>
              ))}
            </Styled.pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  )
}

export default Code

const mapping = {
  'javascript': '#f7df1e',
  'js': '#f7df1e',
  'css': '#ff9800',
  'scss': '#ff9800',
  'typescript': '#a5dbff',
  'jsx': '#61dafb',
  'bash': '#d3d9dd',
  'shell': '#d3d9dd',
  'toml': '#b8d394',
  'json': '#8bc34a',
  'yaml': '#8bc34a',
  'diff': '#e6ffed',
  'graphql': '#e10098',
  'markdown': '#fff',
}