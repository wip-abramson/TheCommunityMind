/**
 * Created by will on 19/05/18.
 */
import React from 'react';
import {graphql} from 'react-apollo';
import {browserHistory} from 'react-router'

import QuestionFocusContainer from '../QuestionFocus/QuestionFocusContainer'

import QUESTION_BY_ID_QUERY from '../../graphql/querys/questionById.query';

export default graphql(QUESTION_BY_ID_QUERY, {
  options: (ownProps) => {
    return ({
      variables: { questionId: ownProps.location.query.questionId},
    })
  },
  props: ({ ownProps, data: { loading, error, questionById } }) => ({
    loading,
    error,
    question: questionById,
    updateQuery: (proxy, updateQuestion) => {

      const query = {
        query: QUESTION_BY_ID_QUERY,
        variables: { questionId: ownProps.location.query.questionId},
      };
      let data = proxy.readQuery(query);

      data.questionById = updateQuestion(data.questionById);
      // Write our data back to the cache.
      query.data = data;
      proxy.writeQuery(query);
    },
    onNextQuestion: () => { browserHistory.push({pathname: "/"})},
    onPreviousQuestion: (previousQuestionId) =>  { browserHistory.push({pathname: "/question", query: {questionId: previousQuestionId}})},
    navRightText: "Random Question"
  })
})(QuestionFocusContainer)