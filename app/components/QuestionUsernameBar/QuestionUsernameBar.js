/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import Username from '../Username/Username';
import FocusType from '../FocusType/FocusType';
import TimeCreated from '../TimeCreated/TimeCreated';

const QuestionUsernameBar = ({ user, isInput, focusType }) => {
  const view = isInput ? (<div className={styles.topBar}>
    <div/>
    <FocusType focusType={focusType}/>
    <div/>
  </div>) : (
    <div className={styles.topBar}>
      <TimeCreated time="3 days ago"/>

      <FocusType focusType={focusType}/>
      <Username user={user}/>
    </div>  );

  return view;
};

QuestionUsernameBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  isInput: PropTypes.bool.isRequired,
  focusType: PropTypes.string.isRequired
};

export default QuestionUsernameBar;