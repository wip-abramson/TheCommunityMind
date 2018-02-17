/**
 * Created by will on 19/12/17.
 */
import React from 'react'
import FaClose from 'react-icons/fa/close'

import AskWhy from './AskWhy';
import AskWhatIf from './AskWhatIf';
import AskHow from './AskHow';

import { WHY, WHATIF, HOW } from '../../actions/QuestionPopup';

import styles from './questionPopup.css';

const QuestionPopup = (props) => {
  function getModalContent() {

    if (props.questionPopup.questionType === HOW) {
      return <AskHow placeholder="How ...?" hideQuestionPopup={props.hideQuestionPopup} questionType={props.questionPopup.questionType}/>
    }
    if (props.questionPopup.questionType === WHATIF) {
      return <AskWhatIf placeholder="What If ...?" hideQuestionPopup={props.hideQuestionPopup} questionType={props.questionPopup.questionType}/>
    }
    return <AskWhy placeholder="Why ...?" hideQuestionPopup={props.hideQuestionPopup} questionType={props.questionPopup.questionType} />
  }

  return (
    <div className={props.questionPopup.visible ? styles.modalVisible : styles.modal}>

      <div className={styles.modalContent}>
        <FaClose onClick={props.hideQuestionPopup} className={styles.close}/>
        {getModalContent()}
      </div>
    </div>
  )
};



export default QuestionPopup;