import React from 'react'
import Main from '../components/Main'
import { connect } from 'react-redux'
import { updateCurrentTopic } from '../actions/Topic'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'

const mapStateToProps = function(state) {
  return {
    topics: state.topics
  }
}

const mapDispatchToProps = function(dispatch) {
  return {

  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

module.exports = MainContainer;
