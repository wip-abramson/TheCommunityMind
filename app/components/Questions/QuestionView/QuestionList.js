/**
 * Created by will on 23/04/17.
 */
import React from "react";
import PropTypes from 'prop-types'
import QuestionContainer from "./QuestionOld/QuestionContainer";

const QuestionList = (props) => {
  // Maps a list of either Why WhatIf or How edges to create individual Question components for each question stored in the edge
  var id =1;
  if (props.error) {
    return <div>error</div>
  }
  if (props.loading) {
    return <div>loading</div>
  }

  return (

    <div>
      {
        props.connection.edges.map(function (edge) {
        return (
          <QuestionContainer
            key={"id-" + (id ++)}
            onSelectQuestion={props.onSelectQuestion}
            // question type is either a Why, WhatIf or How type depending on what this is a list of
            question={edge.node}
            link={props.link}
          >
          </QuestionContainer>)
      })}
      {props.connection.pageInfo.hasNextPage ? <button onClick={() => {props.loadMoreEntries()}}>Load More</button> : null}

    </div>
  )
};

QuestionList.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({
    node:  PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }).isRequired
      }).isRequired
    }).isRequired,
    cursor: PropTypes.string,
  })),
  onSelectQuestion: PropTypes.func,
  link: PropTypes.string,
  hasNextPage: PropTypes.bool.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default QuestionList;