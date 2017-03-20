import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { TOPIC_HEADERS } from '../actions/TopicHeader'

function TopicHeader (props) {

  var style={
    textAlign: "center",
  }

  var component = []
  component.push(<Link key="1" to="/topic" onClick={() => {props.onUpdateHeader(TOPIC_HEADERS.WHY)}}>{props.topicName}</Link>)


  switch (props.headerType) {
    case TOPIC_HEADERS.WHY:

      component.push(<p key="2">Why?</p>)
      break;
    case TOPIC_HEADERS.WHATIF:
      component.push(<Link key="2" to="/why" onClick={() => {props.onUpdateHeader(TOPIC_HEADERS.WHATIF)}}>{props.why}</Link>)
      component.push(<p key="3">What if?</p>)
      break;
    case TOPIC_HEADERS.HOW:
      component.push(<Link key="2" to="/why" onClick={() => {props.onUpdateHeader(TOPIC_HEADERS.WHATIF)}}>{props.why}</Link>)
      component.push(<Link key="3" to="/whatif" onClick={() => {props.onUpdateHeader(TOPIC_HEADERS.HOW)}}>{props.whatIf}</Link>)
      component.push(<p key="4">How?</p>)
      break;
    default:

  }


  return (
    <div style={style}>
      {component}
    </div>

  )
}

TopicHeader.PropTypes = {
  topicName: PropTypes.string.isRequired,
  why: PropTypes.string.isRequired,
  whatIf: PropTypes.string.isRequired,
  onUpdateHeader: PropTypes.func.isRequired
}



module.exports = TopicHeader;
