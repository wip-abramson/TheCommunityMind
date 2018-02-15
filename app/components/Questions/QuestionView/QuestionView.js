import React from "react";
import PropTypes from 'prop-types';
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

      <QuestionList
        edges={props.connection.edges}
        ctQuestion={props.ctQuestion}
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
          ctQuestion={() => {
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
          ctQuestion={() => {
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
  ctQuestion: PropTypes.func,
  connection: PropTypes.shape({
    edges: PropTypes.array,

  }),
  loading: PropTypes.bool,
  // error: PropTypes.bool,
  // refetchQuery: PropTypes.shape({}).isRequired,
  createQuestion: PropTypes.func.isRequired,
};

export default QuestionView;

