import React from "react";
import {connect} from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import {updateCurrentWhatIf} from "../../actions/WhatIf";
import {compose, graphql} from "react-apollo";
import {addWhatIfMutation} from "../../queries/mutations";
import {whatIfListQuery} from "../../queries/queries";

const mapStateToProps = function (state) {
  console.log(state.currentWhy.id)
  return {

    parentId: state.currentWhy.id,
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
    name: 'addQuestionMutation',
    options: (props) => ({
      variables: {whyId: props.parentId}
    })
  })
)(QuestionView)

export default WhatIf;
