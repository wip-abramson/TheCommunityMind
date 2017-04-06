import React from "react";
import Main from "../components/Main";
import {connect} from "react-redux";

const mapStateToProps = function (state) {
  return {
    topics: state.topics
  }
}

const mapDispatchToProps = function (dispatch) {
  return {}
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

module.exports = MainContainer;
