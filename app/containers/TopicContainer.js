import React from 'react'
import Topic from '../components/Topic'
import { connect } from 'react-redux'

const mapStateToProps = function(state) {
  return {
    topicName: state.currentTopic.name,
    headerType: state.headerType,
    why: (state.currentWhy? state.currentWhy.question : ""),
    whatIf: (state.currentWhatIf? state.currentWhatIf.question : ""),
  }
}


const TopicContainer = connect(
  mapStateToProps
)(Topic)

module.exports = TopicContainer;
