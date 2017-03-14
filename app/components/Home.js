import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import TextInput from './TextInput'

function Home (props) {
  return (
    <div>
      <div>
        <TextInput
          onSubmit = {props.onAddTopic}
          submitName = "Add Topic"
          placeholder = "New topic"
        />
      </div>

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
