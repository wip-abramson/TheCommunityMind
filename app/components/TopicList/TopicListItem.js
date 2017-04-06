import React from "react";
import {Link} from "react-router";

export default function TopicListItem(props) {
  var style = {
    display: 'block',
    width: '100%'
  }
  return (
    <Link
      onClick={() => {
        console.log("Selecting topic")
        props.onSelectTopic(props.topic)
      }}
      style={style}
      to='topic'>
      {props.children}
    </Link>)
}