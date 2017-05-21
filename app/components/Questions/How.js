import React from "react";
import { connect } from "react-redux";
import QuestionView from "./QuestionView/QuestionView";
import { compose, graphql } from "react-apollo";
import { addHowMutation } from "../../graphql/mutations";
import { howListQuery } from "../../graphql/queries";

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
  graphql(howListQuery, {
    options: (props) => ({
      variables: { parentId: props.currentWhatIf.id },
      pollInterval: 5000
    }),
    props: ({ ownProps, data: { loading, error, hows } }) => ({
      loading,
      error,
      questions: hows,
      placeholder: "How ...?",
      refetchQuery: howListQuery,
      currentWhy: ownProps.currentWhy,
      currentWhatIf: ownProps.currentWhatIf,
    })
  }),
  graphql(addHowMutation, {
    name: 'addQuestionMutation',
    options: (props) => ({
      variables: { whatIfId: props.currentWhatIf.id },
    }),
  })
)(QuestionView)

export default How;
