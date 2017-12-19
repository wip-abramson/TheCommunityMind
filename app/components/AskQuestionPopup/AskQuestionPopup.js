/**
 * Created by will on 19/12/17.
 */
import React from 'react'
import FaClose from 'react-icons/fa/close'

import AskWhy from './AskWhy';
import AskWhatIf from './AskWhatIf';
import AskHow from './AskHow';

import { WHY, WHATIF, HOW } from '../../actions/AskQuestionPopup';

import styles from './askQuestionPopup.css';

const AskQuestionPopup = (props) => {
  console.log(props.askQuestionPopup)
  function getModalContent() {

    if (props.askQuestionPopup.questionType === HOW) {
      return <AskHow placeholder="How ...?" hideAskQuestionPopup={props.hideAskQuestionPopup} questionType={props.askQuestionPopup.questionType}/>
    }
    if (props.askQuestionPopup.questionType === WHATIF) {
      return <AskWhatIf placeholder="What If ...?" hideAskQuestionPopup={props.hideAskQuestionPopup} questionType={props.askQuestionPopup.questionType}/>
    }
    return <AskWhy placeholder="Why ...?" hideAskQuestionPopup={props.hideAskQuestionPopup} questionType={props.askQuestionPopup.questionType} />
  }

  return (
    <div className={props.askQuestionPopup.visible ? styles.modalVisible : styles.modal}>

      <div className={styles.modalContent}>
        <FaClose onClick={props.hideAskQuestionPopup} className={styles.close}/>
        {getModalContent()}
      </div>
    </div>
  )
};



export default AskQuestionPopup;