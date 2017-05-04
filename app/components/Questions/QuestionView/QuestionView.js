import React, {PropTypes} from "react";
import QuestionInput from "./QuestionInput";
import QuestionList from "./QuestionList";
import Question from './Question/Question';

function QuestionView(props) {

  if (props.loading) {
    return <p>Loading ...</p>;
  }
  if (props.error) {
    return <p>{props.error.message}</p>;
  }
  return (
    <div >
      {getCurrentWhyQuestion(props.currentWhy)}

      {getCurrentWhatIf(props.currentWhatIf)}

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

function getCurrentWhyQuestion(question) {
  if (question) {
    return (
      <Question
        question={question}
        stars={question.stars}
        link='/'
        onSelectQuestion={() => {return null} }
      >
        {question.question}
      </Question>
    )
  }
}

function getCurrentWhatIf(question) {
  if (question) {
    return (
      <Question
        question={question}
        stars={question.stars}
        link='/whatif'
        onSelectQuestion={() => {return null} }
      >
        {question.question}
      </Question>
    )
  }
}

QuestionView.PropTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  addQuestionMutation: PropTypes.func.isRequired,
}

export default QuestionView
