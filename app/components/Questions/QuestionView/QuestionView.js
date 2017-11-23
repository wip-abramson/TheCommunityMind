import React, { PropTypes } from "react";
import QuestionInput from "./QuestionInput";
import QuestionList from "./QuestionList";
import QuestionContainer from './Question/QuestionContainer';
import QuestionInputContainer from './QuestionInput/QuestionInputContainer';

function QuestionView(props) {

  function getQuestionInput() {
    if (props.currentUser) {
      return props.currentWhy ?
        <QuestionInput
          placeholder={props.placeholder}
          createQuestion={props.createQuestion}
          parentId={props.parentId}
        >
        </QuestionInput>
        :
        <QuestionInputContainer
          placeholder={props.placeholder}
          createQuestion={props.createQuestion}
        />
    }
  }

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

      {getQuestionInput()}


      <QuestionList
        questions={props.questions.edges}
        onSelectQuestion={props.onSelectQuestion}
        link={props.link}
        currentUser={props.currentUser}
        refetchQuery={props.refetchQuery}
      />
    </div>
  )
}

function getCurrentWhyQuestion(question) {
  if (question) {
    return (
      <div>
        <QuestionContainer
          questionType={question}
          link='/'
          onSelectQuestion={() => {
            return null
          } }
        >
        </QuestionContainer>
        <br/>
      </div>

    )
  }
}

function getCurrentWhatIf(question) {
  if (question) {
    return (
      <div>
        <QuestionContainer
          questionType={question}
          link='/whatif'
          onSelectQuestion={() => {
            return null
          } }
        >
        </QuestionContainer>
        <br/>

      </div>
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
  refetchQuery: PropTypes.shape({}).isRequired,
  createQuestion: PropTypes.func.isRequired,
};

export default QuestionView;

