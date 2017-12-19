/**
 * Created by will on 19/12/17.
 */
import React from 'react'
import FaClose from 'react-icons/fa/close'

import AskWhy from './AskWhy';
import AskWhatIf from './AskWhatIf';

import styles from './askQuestionPopup.css';

const AskQuestionPopup = (props) => {

  return (
    <div className={styles.modal}>

      <div className={styles.modalContent}><FaClose className={styles.close}/><AskWhatIf/></div>
    </div>
  )
};

export default AskQuestionPopup;