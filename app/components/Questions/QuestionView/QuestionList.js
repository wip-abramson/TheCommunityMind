/**
 * Created by will on 23/04/17.
 */
import React from "react";
import PropTypes from 'prop-types'
import QuestionContainer from "./Question/QuestionContainer";

const QuestionList = (props) => {
  // Maps a list of either Why WhatIf or How edges to create individual Question components for each question stored in the edge
  var id =1;

  return (

    <div>
      {

        props.edges.map(function (edge) {
        return (
          <QuestionContainer
            key={"id-" + (id ++)}
            onSelectQuestion={props.onSelectQuestion}
            // question type is either a Why, WhatIf or How type depending on what this is a list of
            questionType={edge.node}
            link={props.link}
            currentUser={props.currentUser}
          >
          </QuestionContainer>)
      })}
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
  onSelectQuestion: PropTypes.func.isRequired,
  link: PropTypes.string,
};

export default QuestionList;