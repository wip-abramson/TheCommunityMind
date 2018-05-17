/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionText = () =>
  <div className={styles.question}>
    <div className={styles.questionText}>
      Do all questions need answers?
    </div>
  </div>;

export default QuestionText;