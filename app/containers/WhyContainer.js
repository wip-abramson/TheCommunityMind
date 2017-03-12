import React from 'react'
import { connect } from 'react-redux'
import Why from '../components/Why'
import { addWhy, updateCurrentWhy } from '../actions/Why'

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
    },
    onSelectWhy:function(why) {
      console.log("Selecting Why", why)
      dispatch(updateCurrentWhy(why))
    }
  }
}

const WhyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Why);

module.exports = WhyContainer;
