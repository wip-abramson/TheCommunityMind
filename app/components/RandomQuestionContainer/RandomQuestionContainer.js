/**
 * Created by will on 19/05/18.
 */
import React from 'react';
import {graphql} from 'react-apollo';
import {browserHistory} from 'react-router';

import QuestionFocusContainer from '../QuestionFocus/QuestionFocusContainer';

import RANDOM_QUESTION_QUERY from '../../graphql/querys/randomQuestion.query';


export default graphql(RANDOM_QUESTION_QUERY, {
  options: (ownProps) => {
    if(ownProps.location.query.notId) {
      return ({
        variables: { currentQuestionId: ownProps.location.query.notId},
      })
    }
    return ({ })
  },
  props: ({ ownProps, data: { loading, error, randomQuestion } }) => ({
    loading,
    error,
    question: randomQuestion,
    onNextQuestion: () => { browserHistory.push({pathname: "/random", query: {notId: randomQuestion.id}})},
    onPreviousQuestion: (previousQuestionId) =>  { browserHistory.push({pathname: "/question", query: {questionId: previousQuestionId}})},
  })
})(QuestionFocusContainer);