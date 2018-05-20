/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionText = ({questionText}) =>
  <div className={styles.question}>
    <div className={styles.questionText}>
      {formatQuestion(questionText)}
    </div>
  </div>;


function formatQuestion(question) {
  let newQuestion = question[0].toUpperCase() + question.substring(1)

  if (newQuestion[newQuestion.length] != "?") {
    newQuestion += "?";
  }
  return newQuestion;
}

QuestionText.propTypes = {
  questionText: PropTypes.string.isRequired
};

export default QuestionText;