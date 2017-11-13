/**
 * Created by will on 23/04/17.
 */
import React, { PropTypes } from "react";
import QuestionContainer from "./Question/QuestionContainer";

const QuestionList = (props) => {
  // Maps a list of either Why WhatIfs or Hows to create individual Question components for each
  return (
    <div>
      {props.questions.map(function (question) {
        return (
          <QuestionContainer
            key={"id-" + question.id}
            onSelectQuestion={props.onSelectQuestion}
            questionType={question}
            link={props.link}
          >
          </QuestionContainer>)
      })}
    </div>
  )
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
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
  }).isRequired),
};

export default QuestionList;