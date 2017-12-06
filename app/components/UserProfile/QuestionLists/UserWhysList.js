/**
 * Created by will on 29/11/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_WHYS_QUERY from '../../../graphql/querys/userWhys.query';

const UserWhysList = graphql(USER_WHYS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userWhys } }) => ({
    loading,
    error,
    connection: userWhys,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userWhys.edges[userWhys.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userWhys: {
              edges: { $push: fetchMoreResult.userWhys.edges },
              pageInfo: { $set: fetchMoreResult.userWhys.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default UserWhysList;
