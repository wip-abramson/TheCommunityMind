import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { updateCurrentWhatIf } from "../../actions/WhatIf";
import { compose, graphql } from "react-apollo";
import CREATE_WHATIF_MUTATION from "../../graphql/createWhatIf.mutation";
import WHATIFS_QUERY from "../../graphql/whatIfs.query";

const mapStateToProps = function (state) {
  console.log("Getting current why", state.currentWhy);
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
  graphql(WHATIFS_QUERY, {
    options: (props) => ({
      variables: { parentId: props.currentWhy.id },
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, whatIfs } }) => ({
      loading,
      error,
      questions: whatIfs,
      onSelectQuestion: ownProps.onSelectQuestion,
      placeholder: "What If ...?",
      link: "/how",
      refetchQuery: WHATIFS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: null,
    })
  }),
  graphql(CREATE_WHATIF_MUTATION, {
    name: 'createQuestionMutation',
    options: (props) => ({
      variables: { whyId: props.currentWhy.id, userId: 1 }
    })
  })
)(QuestionView)

export default WhatIf;
