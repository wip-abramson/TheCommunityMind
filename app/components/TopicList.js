import React from 'react'
import { Link } from 'react-router'
import FullDiv  from './generic/FullDiv'
import { Col } from 'react-bootstrap'

function TopicList(props) {
  var style = {
    height: "100%",
    border: "2px solid grey"
  }
  return (
    <Col sm={3} md={2} style={style}>
      <ul>
        {props.topics.map(function(topic) {
          return (
            <li key={topic.id}>
              <Link
                onClick={() => {
                  console.log("Selecting topic")
                  props.onSelectTopic(topic)
                }}
                to='topic'>
                {topic.name}
              </Link>
          </li>)
        })}
      </ul>
    </Col>
  )
}

module.exports = TopicList;
