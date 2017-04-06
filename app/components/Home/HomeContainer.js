import React from "react";
import Home from "./Home";
import {connect} from "react-redux";
import {updateCurrentTopic} from "../../actions/Topic";
import {setTopicHeaderType, TOPIC_HEADERS} from "../../actions/TopicHeader";

const mapStateToProps = function (state) {
  return {}
}

const mapDispatchToProps = function (dispatch) {
  return {
    onSelectTopic: function (topic) {
      console.log(topic)
      dispatch(updateCurrentTopic(topic));
      dispatch(setTopicHeaderType(TOPIC_HEADERS.HOME))
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
