import React from 'react'
import { connect } from 'react-redux'
import QuestionView from '../components/QuestionView'
import { addHow } from '../actions/How'


const mapStateToProps =  function(state) {
  return {
    questions: state.hows,
    placeholder: "How ...?",
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      console.log("Dispatching add how")
      dispatch(addHow(question))
    },
  }
}


const HowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionView)


module.exports = HowContainer;
