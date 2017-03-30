import React from 'react'
import { connect } from 'react-redux'
import QuestionView from '../components/QuestionView'
import { addWhatIf, updateCurrentWhatIf } from '../actions/WhatIf'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'

const mapStateToProps = function(state) {
  return {
    questions: state.whatIfs,
    placeholder: "What If ...?",
    link: "/whatif",
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      dispatch(addWhatIf(question))
    },
    onSelectQuestion: function(whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.HOW))
    }
  }
}

const WhatIfContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionView)

module.exports = WhatIfContainer;
