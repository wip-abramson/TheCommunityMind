import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { compose, graphql } from "react-apollo";
import CREATE_HOW_MUTATION from "../../graphql/createHow.mutation";
import HOWS_QUERY from "../../graphql/hows.query";

const mapStateToProps = function (state) {
  return {
    currentWhy: state.currentWhy,
    currentWhatIf: state.currentWhatIf
  }
}

const How = compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(HOWS_QUERY, {
    options: (props) => ({
      variables: { parentId: props.currentWhatIf.id },
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, hows } }) => ({
      loading,
      error,
      questions: hows,
      placeholder: "How ...?",
      refetchQuery: HOWS_QUERY,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: ownProps.currentWhatIf,
    })
  }),
  graphql(CREATE_HOW_MUTATION, {
    name: 'createQuestionMutation',
    options: (props) => ({
      variables: { whatIfId: props.currentWhatIf.id, userId: 1 },
    }),
  })
)(QuestionView)

export default How;
