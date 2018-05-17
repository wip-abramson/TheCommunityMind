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
const QuestionUsernameBar = () =>
  <div className={styles.topBar}>
    <FocusType focusType="Question Focus"/>
    <TimeCreated time="3 days ago"/>
    <Username user={{id: "1", username: "Will"}}/>
  </div>;

export default QuestionUsernameBar;