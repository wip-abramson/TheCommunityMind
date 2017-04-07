import React from "react";
import TopicHeaderContainer from "./TopicHeader/TopicHeaderContainer";
import TopicBreadcrumb from "./TopicBreadcrumb";
//
function Topic(props) {
  return (
    <div>
      <TopicHeaderContainer />
      <TopicBreadcrumb/>
      {props.children}
    </div>
  )
}

export default Topic
