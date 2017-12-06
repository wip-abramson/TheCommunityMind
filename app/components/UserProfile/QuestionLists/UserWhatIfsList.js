/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import QuestionListContainer from './QuestionListContainer';

import USER_WHATIFS_QUERY from '../../../graphql/querys/userWhatIfs.query';

const UserWhatIfsList = graphql(USER_WHATIFS_QUERY, {
  options: (props) => ({
    variables: {userId: props.userId, first: 5}
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, userWhatIfs } }) => ({
    loading,
    error,
    connection: userWhatIfs,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: userWhatIfs.edges[userWhatIfs.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          // push results (older whys) to end of whys list
          return update(previousResult, {

            userWhatIfs: {
              edges: { $push: fetchMoreResult.userWhatIfs.edges },
              pageInfo: { $set: fetchMoreResult.userWhatIfs.pageInfo },
            },

          });
        }
      })
    }
  })
})(QuestionListContainer);

export default UserWhatIfsList;