/**
 * Created by will on 21/11/17.
 */
import React from 'react';

import { Link } from 'react-router';

const ThreadBar = (props) => {
  if (props.loading) {
    return <p>Loading ...</p>;
  }
  if (props.error) {
    return <p>{props.error.message}</p>;
  }
  // console.log(props.tags.length);
  return (
    <div style={{padding: "10px"}}>
      <Link to="/">Home</Link>
      {props.tags.map(tag => {
        var linkTo = "/thread/" + tag.name;
        return <Link to={linkTo}>{tag.name[0].toUpperCase() + tag.name.slice(1)}</Link>
      })}

      <Link to="/popular">Popular in the Community</Link>
      <Link to="/threads">More ...</Link>
    </div>
  )

}

export default ThreadBar;