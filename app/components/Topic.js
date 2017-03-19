import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { TOPIC_HEADERS } from '../actions/TopicHeader'

function Topic (props) {

  var component = []
  component.push(<Link key="1" to="/topic">{props.topicName}</Link>)


  switch (props.headerType) {
    case TOPIC_HEADERS.WHY:
      
      component.push(<p key="2">Why?</p>)
      break;
    case TOPIC_HEADERS.WHATIF:
      component.push(<Link key="2" to="/why">{props.why}</Link>)
      component.push(<p key="3">What if?</p>)
      break;
    case TOPIC_HEADERS.HOW:
      component.push(<Link key="2" to="/why">{props.why}</Link>)
      component.push(<Link key="3" to="/whatif">{props.whatIf}</Link>)
      component.push(<p key="4">How?</p>)
      break;
    default:

  }


  return (
    <div>
      {component}
      {props.children}
    </div>

  )
}

Topic.PropTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}



module.exports = Topic;
