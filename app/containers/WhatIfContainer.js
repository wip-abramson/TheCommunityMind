import React from 'react'
import { connect } from 'react-redux'
import WhatIf from '../components/WhatIf'
import { addWhatIf, updateCurrentWhatIf } from '../actions/WhatIf'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'

const mapStateToProps = function(state) {
  return {
    whatIfs: state.whatIfs,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      dispatch(addWhatIf(question))
    },
    onSelectWhatIf: function(whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.HOW))
    }
  }
}

const WhatIfContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatIf)

module.exports = WhatIfContainer;
