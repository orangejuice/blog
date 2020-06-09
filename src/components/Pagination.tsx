/** @jsx jsx */
import * as React from "react"
import {jsx} from "theme-ui"
import LocalizedLink from "./LocalizedLink";


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
          ← Previous Page
        </LocalizedLink>
      )}
    </li>
    <li style={{minWidth: "120px", textAlign: "center"}}> Page {props.current} / {props.total} </li>
    <li style={{minWidth: "120px", textAlign: "center"}}>
      {!props.last && (
        <LocalizedLink sx={{variant: `links.primary`}} to={props.next} rel="next">
          Next Page →
        </LocalizedLink>
      )}
    </li>
  </ul>
}

export default Pagination