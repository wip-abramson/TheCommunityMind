/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionInput = ({value, onInputChange}) =>
  <div className={styles.questionInputBox}>
    <textarea
      placeholder="Ask your beautiful question ...."
      value={value}
      onChange={onInputChange}
      autoFocus={true}
      className={styles.questionInput}/>
  </div>;

export default QuestionInput;