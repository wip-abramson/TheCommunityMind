/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import StarIcon from './icons/StarIcon';
import ThinkIcon from './icons/ThinkIcon';
import AskQuestionIcon from './icons/AskQuestionIcon';
import AddLinkIcon from './icons/AddLinkIcon';

const UserInteractionsBar = () =>
  <div className={styles.bottomBar}>
    <StarIcon starCount={13}/>
    <ThinkIcon/>
    <div className={styles.spaceHolder}></div>
    <AddLinkIcon/>
    <AskQuestionIcon/>

  </div>;

export default UserInteractionsBar;