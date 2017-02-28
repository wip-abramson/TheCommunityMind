import React from 'react'
import { Link } from 'react-router'

function Topic (props) {

  return (
    <div>
      <h1 className="text-center">{props.name}</h1>


      {props.children}
    </div>

  )
}

module.exports = Topic;
