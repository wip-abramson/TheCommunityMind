import React from "react";
import {connect} from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import {updateCurrentWhatIf} from "../../actions/WhatIf";
import {compose, graphql} from "react-apollo";
import {addWhatIfMutation} from "../../queries/mutations";
import {whatIfListQuery} from "../../queries/queries";

const mapStateToProps = function (state) {
  console.log("Getting current why",state.currentWhy);
  return {

    currentWhy: state.currentWhy,
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    onSelectQuestion: function (whatIf) {
      dispatch(updateCurrentWhatIf(whatIf))
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
      variables: {parentId: props.currentWhy.id},
      pollInterval: 5000
    }),
    props: ({ownProps, data: {loading, error, whatIfs}}) => ({
      loading,
      error,
      questions: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      refetchQuery: whatIfListQuery,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: null,
    })
  }),
  graphql(addWhatIfMutation, {
    name: 'addQuestionMutation',
    options: (props) => ({
      variables: {whyId: props.currentWhy.id}
    })
  })
)(QuestionView)

export default WhatIf;
