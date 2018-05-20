/**
 * Created by will on 03/03/18.
 */
import React from 'react'
import QUESTIONS_QUERY from '../../../graphql/querys/questions.query';
import { graphql } from 'react-apollo';
import QuestionList from '../QuestionList/QuestionList';
import update from 'immutability-helper';


export default graphql(QUESTIONS_QUERY, {
  options: (props) => {
    console.log("PARAMS", props.params);
    return ({
      variables: { first: 10},
      // pollInterval: 5000
    })
  },
  props: ({ ownProps, data: { fetchMore, loading, error, questions } }) => ({
    loading,
    error,
    connection: questions,
    onSelectQuestion: ownProps.onSelectQuestion,
    refetchQuery: QUESTIONS_QUERY,
    // currentUser: ownProps.currentUser,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: questions.edges[questions.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            questions: {
              edges: { $push: fetchMoreResult.questions.edges },
              pageInfo: { $set: fetchMoreResult.questions.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionList);

