/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionsList from '../../QuestionsList/QuestionsList';

import USER_STARRED_QUESTIONS_QUERY from '../../../graphql/querys/userStarredQuestions.query';

let after = null;
const StarredQuestionsList = graphql(USER_STARRED_QUESTIONS_QUERY, {
  options: (props) => {
    after = null;
    return ({
      variables: { userId: props.user.id, first: 10 }
    })
  },
  props: ({ ownProps, data: { fetchMore, loading, error, userStarredQuestions } }) => ({
    loading,
    error,
    questionConnection: userStarredQuestions,
    totalQuestionsCount: ownProps.user.questionsStarredCount,
    title: ownProps.user.username + "'s Starred Questions",
    updateQuery: (proxy, updateQuestions) => {

      const query = {
        query: USER_STARRED_QUESTIONS_QUERY,
        variables: { userId: ownProps.user.id, first: 10 }
      };

      if (after) {
        query.variables.after = after;
      }
      let data = proxy.readQuery(query);

      data.userStarredQuestions.edges = updateQuestions(data.userStarredQuestions.edges);
      // Write our data back to the cache.
      query.data = data;
      proxy.writeQuery(query);
    },
    loadMoreEntries() {
      after = userStarredQuestions.edges[userStarredQuestions.edges.length - 1].cursor;
      fetchMore({
        variables: {
          after: after

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
})(QuestionsList);

export default StarredQuestionsList;