/** @jsx jsx */
import {Link} from "gatsby";
import React from "react";
import {jsx} from "theme-ui";

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
        <Link sx={{variant: `links.primary`}} to={props.prev} rel="prev">
          ← Previous Page
        </Link>
      )}
    </li>
    <li style={{minWidth: "120px", textAlign: "center"}}> Page {props.current} / {props.total} </li>
    <li style={{minWidth: "120px", textAlign: "center"}}>
      {!props.last && (
        <Link sx={{variant: `links.primary`}} to={props.next} rel="next">
          Next Page →
        </Link>
      )}
    </li>
  </ul>
}

export default Pagination