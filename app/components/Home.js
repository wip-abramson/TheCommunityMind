import React, { PropTypes } from 'react'
import { Link } from 'react-router'


function Home (props) {
  return (
    <div>

      <ul>
        {props.topics.map(function(topic) {

          return (<li key={topic.id}><Link to='topic'>{topic.name}</Link></li>)
        })}
      </ul>

    </div>
  )
}

Home.PropTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

module.exports = Home;
