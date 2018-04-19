/**
 * Created by will on 19/12/17.
 */
import React from 'react'
import FaClose from 'react-icons/fa/close'

import QuestionInputContainer from './QuestionInput/QuestionInputContainer';

import styles from './questionPopup.css';

const QuestionPopup = (props) => {

  return (
    <div className={props.questionPopup.visible ? styles.modalVisible : styles.modal}>

      <div className={styles.modalContent}>
        <FaClose onClick={props.hideQuestionPopup} className={styles.close}/>
        <QuestionInputContainer parentId={props.questionPopup.parentId} question={props.questionPopup.question} hideQuestionPopup={props.hideQuestionPopup}/>
      </div>
    </div>
  )
};



export default QuestionPopup;