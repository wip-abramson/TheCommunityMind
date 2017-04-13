import React, {PropTypes} from "react";
import QuestionInput from "./QuestionInput";
import Question from "./Question";


function QuestionView(props) {

  if (props.loading) {
    return <p>Loading ...</p>;
  }
  if (props.error) {
    return <p>{props.error.message}</p>;
  }
  return (
    <div>
      <QuestionInput
        placeholder={props.placeholder}
        mutate={props.mutate}
        refetchQuery={props.refetchQuery}
        parentId={props.parentId}
      >
      </QuestionInput>
      <ul>
        {props.questions.map(function (question) {
          return (
            <Question
              key={"id-" + question.id}
              onSelectQuestion={props.onSelectQuestion}
              question={question}
              link={props.link}
            >
              {question.question}
            </Question>)
        })}
      </ul>
    </div>
  )
}

QuestionView.PropTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
}

export default QuestionView
