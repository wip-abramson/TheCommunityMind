/**
 * Created by will on 23/04/17.
 */
import React from "react";
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
            stars={question.stars}
            link={props.link}
          >
            {question.question}
          </Question>)
      })}
    </div>
  )
}

export default QuestionList;