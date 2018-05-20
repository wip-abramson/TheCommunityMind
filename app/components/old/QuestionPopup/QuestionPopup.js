/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/fa/close';

import QuestionInputContainer from './QuestionInput/QuestionInputContainer';

import styles from './questionPopup.css';

const QuestionPopup = (props) => {
  return (

    <div className={props.questionPopup.visible ? styles.modalVisible : styles.modal}>

      <div className={styles.modalContent}>
        <FaClose onClick={props.hideQuestionPopup} className={styles.close}/>
        <QuestionInputContainer
          parentId={props.questionPopup.parentId}
          question={props.questionPopup.question}
          hideQuestionPopup={props.hideQuestionPopup}
          user={props.user}
        />
      </div>
    </div>
  )
};

QuestionPopup.propTypes = {
  questionPopup: PropTypes.shape({
    parentId: PropTypes.string,
    question: PropTypes.shape()
  }).isRequired,
  user: PropTypes.shape().isRequired
};


export default QuestionPopup;