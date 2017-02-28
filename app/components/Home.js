import React from 'react'
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

module.exports = Home;
