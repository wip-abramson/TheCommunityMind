/**
 * Created by will on 23/04/17.
 */
import React, { PropTypes } from "react";
import Question from "./Question/Question";

const QuestionList = (props) => {
  return (
    <div>
      {props.questions.map(function (question) {
        return (
          <Question
            key={"id-" + question.id}
            onSelectQuestion={props.onSelectQuestion}
            question={question}
            stars={question.question.stars}
            link={props.link}
            value={question.question.question}
            owner={question.question.owner.username}
          >
          </Question>)
      })}
    </div>
  )
}

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
}

export default QuestionList;