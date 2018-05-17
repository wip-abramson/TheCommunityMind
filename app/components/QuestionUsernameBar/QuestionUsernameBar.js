/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import Username from '../Username/Username';
import FocusType from '../FocusType/FocusType';
import TimeCreated from '../TimeCreated/TimeCreated';

// TODO change to props for focus type and user
const QuestionUsernameBar = ({ user, isInput }) => {
  const view = isInput ? (<div className={styles.topBar}/>) : (
    <div className={styles.topBar}>
      <FocusType focusType="Question Focus"/>
      <TimeCreated time="3 days ago"/>
      <Username user={user}/>
    </div>  );

  return view;
};

QuestionUsernameBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  isInput: PropTypes.bool.isRequired
};

export default QuestionUsernameBar;