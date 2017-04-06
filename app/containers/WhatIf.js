import React from "react";
import {connect} from "react-redux";
import QuestionView from "../components/QuestionView";
import {updateCurrentWhatIf} from "../actions/WhatIf";
import {setTopicHeaderType, TOPIC_HEADERS} from "../actions/TopicHeader";
import {compose, gql, graphql} from "react-apollo";

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

export const whatIfListQuery = gql`
    query WhatIfListQuery($parentId: ID!) {
        whatIfs(whyId: $parentId) {
            id
            question
         }
     }
`;

export const addWhatIfMutation = gql`
    mutation AddWhatIfMutation($question: String!, $whyId: ID!) {
        addWhatIf(question: $question, whyId: $whyId) {
           id
           question
        }
    }
`

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
      link: "/whatif",
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
