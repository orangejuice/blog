/** @jsx jsx */
import {jsx} from "theme-ui"
import Tags from "./Tags";
import {FormattedDate, FormattedMessage} from "react-intl";

export const TitleMeta = props => {
  const {className, post} = props

  return <div sx={{color: t => t.colors.secondary}} className={className}>
    {post.tags && <Tags tags={post.tags} sx={{marginRight: `20px`}}/>}
    <span>
      <FormattedDate month="long" year="numeric" day="numeric" value={post.date}/>
      {` — `}
      <FormattedMessage id={"post.timeToRead"} values={{timeToRead: post.timeToRead}}/>
    </span>
  </div>;
}