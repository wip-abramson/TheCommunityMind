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
import AcceptQuestionIcon from './icons/AcceptQuestionIcon';
import CancelQuestionIcon from './icons/CancelQuestionIcon';

const UserInteractionsBar = ({ questionId, toggleIsInput, isInput }) => {
  const view = isInput ? (
    <div className={styles.bottomBar}>
      <div className={styles.spaceHolder}></div>
      <CancelQuestionIcon cancelQuestionInput={toggleIsInput}/>
      <AcceptQuestionIcon acceptQuestionInput={() => console.log("Accept question")}/>
    </div>
  ) : (
    <div className={styles.bottomBar}>
      <StarIcon starCount={13}/>
      <ThinkIcon/>
      <div className={styles.spaceHolder}></div>
      <AddLinkIcon/>
      <AskQuestionIcon changeToInputView={toggleIsInput}/>
    </div>
  );

  return view;
}




UserInteractionsBar.propTypes = {
  questionId: PropTypes.string.isRequired,
  toggleIsInput: PropTypes.func.isRequired,
  isInput: PropTypes.bool.isRequired
};

export default UserInteractionsBar;