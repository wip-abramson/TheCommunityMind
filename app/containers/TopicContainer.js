import React from 'react'
import Topic from '../components/Topic'
import { connect } from 'react-redux'

const mapStateToProps = function(state) {
  return {
    topicName: state.currentTopic.name
  }
}


const TopicContainer = connect(
  mapStateToProps
)(Topic)

module.exports = TopicContainer;
