/**
 * Created by will on 23/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import TOPIC_QUERY from '../../graphql/querys/topic.query';

import TopicProfile from './TopicProfile';

const TopicContainer = graphql(TOPIC_QUERY, {
  options: (props) => ({
    variables: { topicId: props.location.query.topicId, first: 10 }
  }),
  props: ({ ownProps, data: { fetchMore, loading, error, topic } }) => ({
    loading,
    error,
    topic,
    loadMoreEntries() {
      fetchMore({
        variables: {
          after: topic.questions.edges[topic.questions.edges.length - 1].cursor,

        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }
          return update(previousResult, {
            topic: {
              questions: {
                edges: { $push: fetchMoreResult.topic.questions.edges },
                pageInfo: { $set: fetchMoreResult.topic.questions.pageInfo },
              }
            }


          });
        }
      })
    }
  })
})(TopicProfile);

export default TopicContainer;