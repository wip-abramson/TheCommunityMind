import React from 'react'
import TopicHeader from '../components/TopicHeader'
import { connect } from 'react-redux'
import { setTopicHeaderType } from '../actions/TopicHeader'


const mapStateToProps = function(state) {
  return {
    topicName: state.currentTopic.name,
    headerType: state.headerType,
    why: (state.currentWhy? state.currentWhy.question : ""),
    whatIf: (state.currentWhatIf? state.currentWhatIf.question : ""),
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onUpdateHeader: function(headerType) {
      dispatch(setTopicHeaderType(headerType))
    }
  }
}


const TopicHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicHeader)

module.exports = TopicHeaderContainer;
