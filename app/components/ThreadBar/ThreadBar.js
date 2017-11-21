/**
 * Created by will on 21/11/17.
 */
import React from 'react';

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
      <button>Home</button>
      {props.tags.map(tag => {
        return <button>{tag.name[0].toUpperCase() + tag.name.slice(1)}</button>
      })}

      <button>Popular in the Community</button>
      <button>More ...</button>
    </div>
  )

}

export default ThreadBar;