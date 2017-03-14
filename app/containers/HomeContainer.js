import React from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { addTopic, updateCurrentTopic } from '../actions/Topic'

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
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

module.exports = HomeContainer
