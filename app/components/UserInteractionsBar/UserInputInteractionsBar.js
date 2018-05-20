/**
 * Created by will on 19/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import AcceptQuestionIcon from './icons/AcceptQuestionIcon';
import CancelQuestionIcon from './icons/CancelQuestionIcon';

const UserInputInteractionsBar = ({toggleIsInput, onSubmitQuestion}) =>
  <div className={styles.bottomBar}>
    <div className={styles.spaceHolder}/>
    <CancelQuestionIcon cancelQuestionInput={toggleIsInput}/>
    <AcceptQuestionIcon acceptQuestionInput={onSubmitQuestion}/>
  </div>;

UserInputInteractionsBar.propTypes = {
  toggleIsInput: PropTypes.func.isRequired,
  onSubmitQuestion: PropTypes.func.isRequired
};

export default UserInputInteractionsBar;