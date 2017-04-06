import React, {PropTypes} from "react";
import HeaderLink from "./HeaderLink";
import {TOPIC_HEADERS} from "../../../actions/TopicHeader";
import {Well} from "react-bootstrap";

function TopicHeader(props) {

  var style = {
    textAlign: "center",
  }

  var component = []
  component.push(<HeaderLink key="1" to="/topic" onUpdateHeader={() => {
    props.onUpdateHeader(TOPIC_HEADERS.HOME)
  }}>{props.topicName}</HeaderLink>)


  switch (props.headerType) {
    case TOPIC_HEADERS.WHY:

      component.push(<HeaderLink key="2" to="/why">Why?</HeaderLink>)
      break;
    case TOPIC_HEADERS.WHATIF:
      component.push(<HeaderLink key="2" to="/why" onUpdateHeader={() => {
        props.onUpdateHeader(TOPIC_HEADERS.WHATIF)
      }}>{props.why}</HeaderLink>)
      component.push(<HeaderLink key="3" to="/whatif">What if?</HeaderLink>)
      break;
    case TOPIC_HEADERS.HOW:
      component.push(<HeaderLink key="2" to="/why" onUpdateHeader={() => {
        props.onUpdateHeader(TOPIC_HEADERS.WHATIF)
      }}>{props.why}</HeaderLink>)
      component.push(<HeaderLink key="3" to="/whatif" onUpdateHeader={() => {
        props.onUpdateHeader(TOPIC_HEADERS.WHATIF)
      }}>{props.whatIf}</HeaderLink>)
      component.push(<HeaderLink key="4" to="/how">How?</HeaderLink>)
      break;
    default:

  }


  return (
    <Well style={style}>
      {component}
    </Well>

  )
}

TopicHeader.PropTypes = {
  topicName: PropTypes.string.isRequired,
  why: PropTypes.string.isRequired,
  whatIf: PropTypes.string.isRequired,
  onUpdateHeader: PropTypes.func.isRequired
}


module.exports = TopicHeader;
