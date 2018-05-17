/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionText = ({questionText}) =>
  <div className={styles.question}>
    <div className={styles.questionText}>
      {questionText}
    </div>
  </div>;

QuestionText.propTypes = {
  questionText: PropTypes.string.isRequired
};

export default QuestionText;