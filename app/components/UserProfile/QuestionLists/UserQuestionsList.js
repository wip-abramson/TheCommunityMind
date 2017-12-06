/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_QUESTIONS_QUERY from '../../../graphql/querys/userQuestions.query';

const UserQuestionsList = graphql(USER_QUESTIONS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userQuestions } }) => ({
    loading,
    error,
    connection: userQuestions,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userQuestions.edges[userQuestions.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userQuestions: {
              edges: { $push: fetchMoreResult.userQuestions.edges },
              pageInfo: { $set: fetchMoreResult.userQuestions.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default UserQuestionsList;