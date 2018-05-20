/**
 * Created by will on 19/05/18.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { browserHistory } from 'react-router';

import QuestionFocusContainer from '../QuestionFocus/QuestionFocusContainer';

import RANDOM_QUESTION_QUERY from '../../graphql/querys/randomQuestion.query';

export default graphql(RANDOM_QUESTION_QUERY, {
  options: (ownProps) => {
    return ({
      variables: { visitedQuestionIds: ownProps.visitedQuestionIds },
      refetchQuery: graphql(RANDOM_QUESTION_QUERY, {variables: {visitedQuestionIds: ownProps.visitedQuestionIds }})
    });
  },
  props: ({ ownProps, data: { refetchQuery, loading, error, randomQuestion } }) => ({
    loading,
    error,
    question: randomQuestion,
    refetchQuery: refetchQuery,
    onNextQuestion: () => {
      ownProps.onNextQuestion(randomQuestion.id)
    },
    onPreviousQuestion: (previousQuestionId) => {
      browserHistory.push({ pathname: "/question", query: { questionId: previousQuestionId } })
    },
  })
})(QuestionFocusContainer);


