/** @jsx jsx */
import {jsx} from "theme-ui"
import * as React from "react";


const SectionTitle = (props) => {
  return <div sx={{
    textTransform: `uppercase`,
    fontWeight: `bold`,
    //text-align: center;
    position: `relative`,
    paddingBottom: `1rem`,
    margin: `2rem 0 1rem 0`,
    "&:after": {
      content: `""`,
      height: `1px`,
      width: `50px`,
      position: `absolute`,
      bottom: `0`,
      left: `0%`,
      //margin-left: -25px,
      backgroundColor: `secondary`,
    }
  }} {...props}/>
}

export default SectionTitle
