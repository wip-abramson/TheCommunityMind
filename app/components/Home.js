import React, {PropTypes} from 'react'
import AddTopic from './AddTopic'
import TopicList from './TopicList'
import {Row, Col} from 'react-bootstrap'


function Home(props) {

  return (
    <Row className='row'>
      <TopicList
        onSelectTopic={props.onSelectTopic}
      />
      <Col sm={9} md={10}>
        <AddTopic />
      </Col>
    </Row>

  )
}

Home.PropTypes = {
  onSelectTopic: PropTypes.func.isRequired,
}

module.exports = Home;

