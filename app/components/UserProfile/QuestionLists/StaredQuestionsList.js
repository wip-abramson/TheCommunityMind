/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_STARED_QUESTIONS_QUERY from '../../../graphql/querys/userStarredQuestions.query';

const StaredQuestionsList = graphql(USER_STARED_QUESTIONS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userStaredQuestions } }) => ({
    loading,
    error,
    connection: userStaredQuestions,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userStaredQuestions.edges[userStaredQuestions.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userStaredQuestions: {
              edges: { $push: fetchMoreResult.userStaredQuestions.edges },
              pageInfo: { $set: fetchMoreResult.userStaredQuestions.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default StaredQuestionsList;