/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionInput = ({currentInput, onInputChange}) =>
  <div className={styles.questionInputBox}>
    <textarea
      placeholder="Ask your beautiful question ...."
      value={currentInput}
      onChange={(evt) => onInputChange(evt.target.value)}
      autoFocus={true}
      className={styles.questionInput}/>
  </div>;

QuestionInput.propTypes = {
  currentInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default QuestionInput;