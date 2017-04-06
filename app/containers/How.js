import React from "react";
import {connect} from "react-redux";
import QuestionView from "../components/QuestionView";
import {compose, gql, graphql} from "react-apollo";

const mapStateToProps = function (state) {
  return {
    parentId: state.currentWhatIf.id
  }
}


export const howListQuery = gql`
  query HowListQuery($parentId: ID!) {
    hows(whatIfId: $parentId) {
      id
      question
     }
  }
`
export const addHowMutation = gql`
    mutation AddHowMutation($question: String!, $whatIfId: ID!) {
        addHow(question: $question, whatIfId: $whatIfId) {
            id
            question
        }
    }
`

const How = compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(howListQuery, {
    options: (props) => ({
      variables: {parentId: props.parentId},
      pollInterval: 5000
    }),
    props: ({ownProps, data: {loading, error, hows}}) => ({
      loading,
      error,
      questions: hows,
      placeholder: "How ...?",
      refetchQuery: howListQuery,
    })
  }),
  graphql(addHowMutation, {
    options: (props) => ({
      variables: {whatIfId: props.parentId},
    }),
  })
)(QuestionView)


export default How;
