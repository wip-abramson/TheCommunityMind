/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionsList from '../../QuestionsList/QuestionsList';

import USER_QUESTIONS_QUERY from '../../../graphql/querys/userQuestions.query';

const UserQuestionsList = graphql(USER_QUESTIONS_QUERY, {
  options: (props) => ({
    variables: {userId: props.user.id, first: 10}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userQuestions } }) => ({
    loading,
    error,
    questionConnection: userQuestions,
    totalQuestionsCount: ownProps.user.questionsAskedCount,
    title: ownProps.user.username + "'s Questions",
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
})(QuestionsList);

export default UserQuestionsList;