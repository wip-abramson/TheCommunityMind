/**
 * Created by will on 22/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaLeftArrow from 'react-icons/fa/arrow-left';
import FaRightArrow from 'react-icons/fa/arrow-right';

import LinkBox from '../LinkBox/LinkBox';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';


import styles from './styles.css';

const LinkFocus = ({questionLink, onNextQuestion, onPreviousQuestion}) => {
  return (
    <div className={styles.focusGrid}>
      <FaLeftArrow size={30} className={styles.leftNav} onClick={onPreviousQuestion}/>
      <QuestionUsernameBar timeCreated={questionLink.createdAt} user={questionLink.owner} isInput={false} focusType="Link Focus"/>
      <FaRightArrow size={30} className={styles.rightNav} onClick={onNextQuestion}/>
      <LinkBox questionLink={questionLink}/>
    </div>
  )
};

export default LinkFocus;