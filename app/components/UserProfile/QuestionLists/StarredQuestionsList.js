/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_STARRED_QUESTIONS_QUERY from '../../../graphql/querys/userStarredQuestions.query';

const StarredQuestionsList = graphql(USER_STARRED_QUESTIONS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userStarredQuestions } }) => ({
    loading,
    error,
    connection: userStarredQuestions,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userStarredQuestions.edges[userStarredQuestions.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userStarredQuestions: {
              edges: { $push: fetchMoreResult.userStarredQuestions.edges },
              pageInfo: { $set: fetchMoreResult.userStarredQuestions.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default StarredQuestionsList;