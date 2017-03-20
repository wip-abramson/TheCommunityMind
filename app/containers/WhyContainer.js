import React from 'react'
import { connect } from 'react-redux'
import Why from '../components/Why'
import QuestionView from '../components/QuestionView'
import { addWhy, updateCurrentWhy } from '../actions/Why'
import { setTopicHeaderType, TOPIC_HEADERS } from '../actions/TopicHeader'

const mapStateToProps =  function(state) {
  return {
    questions: state.whys,
    placeholder: "Why ...?",
    link: "/why",

  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      console.log("Dispatching add why")
      dispatch(addWhy(question))
    },
    onSelectQuestion:function(why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.WHATIF))
    }
  }
}

const WhyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionView);

module.exports = WhyContainer;
