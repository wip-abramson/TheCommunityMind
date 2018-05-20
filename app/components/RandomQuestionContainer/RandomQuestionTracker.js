/**
 * Created by will on 20/05/18.
 */
import React from 'react';
import {browserHistory} from 'react-router';

import RandomQuestionContainer from './RandomQuestionContainer';

class RandomQuestionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedQuestionIds: []
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  handleNextQuestion(questionId) {
    this.setState({
      visitedQuestionIds: [...this.state.visitedQuestionIds, questionId]
    });

    browserHistory.push({pathname: "/random"})
  }

  render() {
    return (
      <RandomQuestionContainer visitedQuestionIds={this.state.visitedQuestionIds} onNextQuestion={this.handleNextQuestion}/>
    )
  }
}

export default RandomQuestionTracker;