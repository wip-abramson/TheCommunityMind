import React from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { addTopic, updateCurrentTopic } from '../actions/Topic'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'


const mapStateToProps = function(state) {
  return {
    topics: state.topics
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAddTopic: function(topic) {
      console.log("adding topic");
      dispatch(addTopic(topic));
    },
    onSelectTopic: function(topic) {
      console.log(topic)
      dispatch(updateCurrentTopic(topic));
      dispatch(setTopicHeaderType(TOPIC_HEADERS.WHY))
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

module.exports = HomeContainer
