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
      // TODO visited question ids should be tracked in backend
      variables: { visitedQuestionIds: ownProps.visitedQuestionIds },
      refetchQuery: graphql(RANDOM_QUESTION_QUERY, { variables: { visitedQuestionIds: ownProps.visitedQuestionIds } })
    });
  },
  props: ({ ownProps, data: { refetchQuery, loading, error, randomQuestion } }) => ({
    loading,
    error,
    question: randomQuestion,
    refetchQuery: refetchQuery,
    updateQuery: (proxy, updateQuestion) => {

      const query = {
        query: RANDOM_QUESTION_QUERY,
        variables: { visitedQuestionIds: ownProps.visitedQuestionIds },
      };
      let data = proxy.readQuery(query);

      data.randomQuestion = updateQuestion(data.randomQuestion);
      // Write our data back to the cache.
      query.data = data;
      proxy.writeQuery(query);
    },
    onNextQuestion: () => {
      ownProps.onNextQuestion(randomQuestion.id)
    },
    onPreviousQuestion: (previousQuestionId) => {
      browserHistory.push({ pathname: "/question", query: { questionId: previousQuestionId } })
    },
    navRightText: "Random Question"
  })
})(QuestionFocusContainer);


