/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_HOWS_QUERY from '../../../graphql/querys/userHows.query';

const UserHowsList = graphql(USER_HOWS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userHows } }) => ({
    loading,
    error,
    connection: userHows,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userHows.edges[userHows.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userHows: {
              edges: { $push: fetchMoreResult.userHows.edges },
              pageInfo: { $set: fetchMoreResult.userHows.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default UserHowsList;