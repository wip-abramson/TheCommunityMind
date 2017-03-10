import React from 'react'
import { connect } from 'react-redux'
import Why from '../components/Why'
import addWhy from '../actions/Why'

const mapStateToProps =  function(state) {
  return {
    whys: state.whys,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onAskQuestion: function(question) {
      console.log("Dispatching add why")
      dispatch(addWhy(question))
    }
  }
}

const WhyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Why);

module.exports = WhyContainer;
