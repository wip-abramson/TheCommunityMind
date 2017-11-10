import React, { PropTypes } from "react";
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
        createQuestion={props.createQuestion}
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
        link='/'
        onSelectQuestion={() => {
          return null
        } }
        stars={question.question.stars}
        value={question.question.question}
        owner={question.question.owner.username}
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
        link='/whatif'
        onSelectQuestion={() => {
          return null
        } }
        stars={question.question.stars}
        value={question.question.question}
        owner={question.question.owner.username}
      >
        {question.question}
      </Question>
    )
  }
}

QuestionView.propTypes = {
  onSelectQuestion: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      stars: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      staredBy: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }))
    }).isRequired
  }).isRequired),
  loading: PropTypes.bool,
  // error: PropTypes.bool,
  createQuestion: PropTypes.func.isRequired,
};

export default QuestionView;

