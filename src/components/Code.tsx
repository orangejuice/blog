/** @jsx jsx */
import * as React from "react"
import Highlight, {defaultProps} from "prism-react-renderer"
import LightTheme from "prism-react-renderer/themes/nightOwlLight"
import DarkTheme from "prism-react-renderer/themes/nightOwl"
import * as settings from "../../settings"
import {jsx, Styled, useThemeUI} from 'theme-ui'

type CodeProps = {
  codeString: string
  language: string
  noLineNumbers?: boolean
  metastring?: string
  [key: string]: any
}

function getParams(className = ``) {
  const [lang = ``, params = ``] = className.split(`:`)

  return [
    lang.split(`language-`).pop().split(`{`).shift(),
  ].concat(
      // @ts-ignore
      params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      merged[key] = value
      return merged
    }, {})
  )
}

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

const Code = ({
  codeString,
  noLineNumbers = false,
  className: blockClassName,
  metastring = ``
}: CodeProps) => {
  const { showLineNumbers } = settings
  const { colorMode } = useThemeUI()

  const [language, { title = `` }] = getParams(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const hasLineNumbers = !noLineNumbers && language !== `noLineNumbers` && showLineNumbers
  const theme = colorMode == 'light' ? LightTheme : DarkTheme

  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme} >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && (
            <div className="code-title">
              <div>{title}</div>
            </div>
          )}
          <div className="gatsby-highlight" data-language={language}>
            <Styled.pre className={className} style={style} data-linenumber={hasLineNumbers}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })

                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div {...lineProps}>
                    {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
            </Styled.pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  )
}

export default Code
