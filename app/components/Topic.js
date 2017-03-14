import React, { PropTypes } from 'react'
import { Link } from 'react-router'

function Topic (props) {

  return (
    <div>
      <h1 className="text-center">{props.topicName}</h1>
      {props.children}
    </div>

  )
}

Topic.PropTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}



module.exports = Topic;
