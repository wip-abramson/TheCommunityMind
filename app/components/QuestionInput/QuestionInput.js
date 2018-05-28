/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const QuestionInput = ({currentInput, onInputChange, previousQuestion}) =>
  <div className={styles.questionInputBox}>
    <textarea
      placeholder={previousQuestion + "...."}
      value={currentInput}
      onChange={(evt) => onInputChange(evt.target.value)}
      autoFocus={true}
      className={styles.questionInput}/>
  </div>;

QuestionInput.propTypes = {
  currentInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  previousQuestion: PropTypes.string.isRequired
};

export default QuestionInput;