/**
 * Created by will on 06/12/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import QuestionsList from '../../old/QuestionList/QuestionList';

const QuestionListContainer = (props) => {

  if (props.loading) {
    return <p>Loading ...</p>;
  }
  if (props.error) {
    return <p>{props.error.message}</p>;
  }
  console.log(props.connection.pageInfo.hasNextPage);

  return (
    <QuestionsList
      connection={props.connection}
      loadMoreEntries={props.loadMoreEntries}
    />
  )
};

QuestionListContainer.propTypes = {
  connection: PropTypes.shape({
    edges: PropTypes.array.isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired
    }).isRequired
  }),
  loadMoreEntries: PropTypes.func.isRequired,
}

export default QuestionListContainer;