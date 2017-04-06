import React from "react";
import {connect} from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import {updateCurrentWhatIf} from "../../actions/WhatIf";
import {setTopicHeaderType, TOPIC_HEADERS} from "../../actions/TopicHeader";
import {compose, graphql} from "react-apollo";
import {addWhatIfMutation} from "../../queries/mutations";
import {whatIfListQuery} from "../../queries/queries";

const mapStateToProps = function (state) {
  return {
    parentId: state.currentWhy.id,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
      dispatch(setTopicHeaderType(TOPIC_HEADERS.HOW))
    }
  }
}


const WhatIf = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(whatIfListQuery, {
    options: (props) => ({
      variables: {parentId: props.parentId},
      pollInterval: 5000
    }),
    props: ({ownProps, data: {loading, error, whatIfs}}) => ({
      loading,
      error,
      questions: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      refetchQuery: whatIfListQuery
    })
  }),
  graphql(addWhatIfMutation, {
    options: (props) => ({
      variables: {whyId: props.parentId}
    })
  })
)(QuestionView)

export default WhatIf;
