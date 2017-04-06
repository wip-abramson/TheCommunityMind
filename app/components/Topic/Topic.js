import React from "react";
import TopicHeaderContainer from "./TopicHeader/TopicHeaderContainer";

function Topic(props) {
  return (
    <div>
      <TopicHeaderContainer />
      {props.children}
    </div>
  )
}

module.exports = Topic
