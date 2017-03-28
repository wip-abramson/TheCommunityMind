import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import TextInput from './TextInput'
import TopicList from './TopicList'
import FullDiv from './generic/FullDiv'
import { Row, Col } from 'react-bootstrap'

function Home (props) {
  return (
    <Row className='row'>
      <TopicList
        topics={props.topics}
        onSelectTopic={props.onSelectTopic}
      />
      <Col sm={9} md={10}>
        <TextInput
          onSubmit = {props.onAddTopic}
          submitName = "Add Topic"
          placeholder = "New topic"
        />
      </Col>
    </Row>

  )
}

Home.PropTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

module.exports = Home;
