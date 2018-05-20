/**
 * Created by will on 20/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import { graphql } from 'react-apollo';

import QuestionFocusContainer from '../QuestionFocus/QuestionFocusContainer';

import QUESTION_LINKS_QUERY from '../../graphql/querys/questionLinks.query';

class QuestionsLinksViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onPreviousQuestion = this.onPreviousQuestion.bind(this);
    this.getQuestionToDisplay = this.getQuestionToDisplay.bind(this);
  }

  onPreviousQuestion() {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex-1
      })
    }
  }

  onNextQuestion() {
    if (this.state.currentIndex < this.props.questionLinks.edges.length) {
      this.setState({
        currentIndex: this.state.currentIndex+1
      })
    }
  }

  getQuestionToDisplay() {
    if (this.props.questionLinks.edges[this.state.currentIndex].node.fromQuestion.id === this.props.questionId) {
      return this.props.questionLinks.edges[this.state.currentIndex].node.toQuestion;
    }
    else {
      return this.props.questionLinks.edges[this.state.currentIndex].node.fromQuestion;
    }

  }

  render() {
    if (this.props.loading) {
      return <div/>
    }
    else if (this.props.error) {
      return <h1>Error</h1>
    }
    return (
      <div>
        <h1>{this.state.currentIndex + 1 + " / " + this.props.questionLinks.edges.length + " " + this.props.linkType} </h1>
        <button onClick={() => browserHistory.push({pathname: "/question", query: {questionId: this.props.questionId}})}>Back to question</button>
        <QuestionFocusContainer
          loading={false}
          question={this.getQuestionToDisplay()}
          onNextQuestion={this.onNextQuestion}
          onPreviousQuestion={this.onPreviousQuestion}/>
      </div>
    )
  }

}

// TODO question types should at least be an enum not a STRING!!!!
// TODO not paginating yet
export default graphql(QUESTION_LINKS_QUERY, {
  options: (ownProps) => {
    return ({
      variables: { questionId: ownProps.location.query.questionId, linkType: ownProps.location.query.linkType },
    })
  },
  props: ({ ownProps, data: { loading, error, questionLinks } }) => ({
    loading,
    error,
    questionId: ownProps.location.query.questionId,
    questionLinks,
    linkType: ownProps.location.query.linkType,
  })
})(QuestionsLinksViewContainer);
