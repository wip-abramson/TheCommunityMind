import React from 'react'
import { connect } from 'react-redux'
import How from '../components/How'
import { addHow } from '../actions/How'


const mapStateToProps =  function(state) {
  return {
    hows: state.hows,
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
)(How)


module.exports = HowContainer;
