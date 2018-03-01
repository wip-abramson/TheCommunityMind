import React from "react";
import PropTypes from 'prop-types';
import QuestionList from "./QuestionList";
import QuestionContainer from './Question/QuestionContainer';

function QuestionView(props) {

  
  // props.setQuestionType();
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

      <QuestionList
        onSelectQuestion={props.onSelectQuestion}
        edges={props.connection.edges}
        link={props.link}
        currentUser={props.currentUser}
        hasNextPage={props.connection.pageInfo.hasNextPage}
        loadMoreEntries={props.loadMoreEntries}
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
  connection: PropTypes.shape({
    edges: PropTypes.array,

  }),
  loading: PropTypes.bool,
};

export default QuestionView;

