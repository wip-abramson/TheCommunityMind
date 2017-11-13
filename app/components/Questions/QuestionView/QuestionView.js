import React, { PropTypes } from "react";
import QuestionInput from "./QuestionInput";
import QuestionList from "./QuestionList";
import QuestionContainer from './Question/QuestionContainer';

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
        currentUser={props.currentUser}
        // refetchQuery={props.refetchQuery}
      />
    </div>
  )
}

function getCurrentWhyQuestion(question) {
  if (question) {
    return (
      <QuestionContainer
        questionType={question}
        link='/'
        onSelectQuestion={() => {
          return null
        } }
      >
      </QuestionContainer>
    )
  }
}

function getCurrentWhatIf(question) {
  if (question) {
    return (
      <QuestionContainer
        questionType={question}
        link='/whatif'
        onSelectQuestion={() => {
          return null
        } }
      >
      </QuestionContainer>
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
  refetchQuery: PropTypes.shape({

  }).isRequired,
  createQuestion: PropTypes.func.isRequired,
};

export default QuestionView;

