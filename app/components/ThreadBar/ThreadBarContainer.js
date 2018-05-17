/**
 * Created by will on 21/11/17.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo';

import ThreadBar from './ThreadBar';

import TOP_TAGS_QUERY from '../../graphql/querys/topTags.query';




class ThreadBarContainer extends React.Component {

  render() {
    return (
      <ThreadBar/>
    )
  }
}

export default compose(
  graphql(TOP_TAGS_QUERY, {
    props: ({ ownProps, data: { loading, error, topTags } }) => ({
      loading,
      error,
      topics: topTags
    })
  })
)(ThreadBar);