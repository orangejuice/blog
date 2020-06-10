/** @jsx jsx */
import * as React from "react"
import {jsx} from "theme-ui"
import LocalizedLink from "./LocalizedLink";
import {FormattedMessage} from "react-intl";


const Pagination = (props: { first: boolean, prev: string, last: boolean, next: any, current: any, total: any }) => {
  return <ul style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    listStyle: "none",
    padding: 0,
  }}>
    <li style={{minWidth: "120px", textAlign: "center"}}>
      {!props.first && (
        <LocalizedLink sx={{variant: `links.primary`}} to={props.prev} rel="prev">
          ← <FormattedMessage id={"pagination.prev"}/>
        </LocalizedLink>
      )}
    </li>
    <li style={{minWidth: "120px", textAlign: "center"}}>
      <FormattedMessage id={"pagination.pageDesc"} values={{current: props.current, total: props.total}}/>
    </li>
    <li style={{minWidth: "120px", textAlign: "center"}}>
      {!props.last && (
        <LocalizedLink sx={{variant: `links.primary`}} to={props.next} rel="next">
          <FormattedMessage id={"pagination.next"}/> →
        </LocalizedLink>
      )}
    </li>
  </ul>
}

export default Pagination