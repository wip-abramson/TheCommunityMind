import React, {PropTypes} from "react";
import QuestionInput from "./QuestionInput";
import QuestionList from "./QuestionList";

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
        addQuestion={props.addQuestionMutation}
        refetchQuery={props.refetchQuery}
        parentId={props.parentId}
      >
      </QuestionInput>
      <QuestionList
        questions={props.questions}
        onSelectQuestion={props.onSelectQuestion}
        link={props.link}
      />
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
