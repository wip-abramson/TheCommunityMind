import React from 'react'
import TopicHeaderContainer from '../containers/TopicHeaderContainer'

function Topic(props) {
  return (
    <div>
      <TopicHeaderContainer />
      {props.children}
    </div>
  )
}

module.exports = Topic
