/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import { FormGroup, Col, Button, Row, FormControl } from 'react-bootstrap';

import { WHY } from '../../../actions/AskQuestionPopup';
import Thread from '../../ThreadItem/ThreadItem';

import styles from './questionInput.css';

const QuestionInput = ({ questionText, questionThreads, placeholder, onKeyPress, onTextChange, onSubmit, removeThread, questionType }) => {

  return (
    <div
      // style={{ padding: "30px", border: "1px solid black", borderRadius: "20px", margin: "5px" }}
    >

      <FormControl
        type="text"
        placeholder={placeholder}
        value={questionText}
        onChange={(e) => onTextChange(e)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            onSubmit();
          }
        } }
      />
      <div className={styles.flexRow}>
        {questionType === WHY ? <div>
          <p>Link your question into the community mind by adding up to five threads</p>
          <div>
            {questionThreads.map((thread) => {
              return <Thread key={thread.id} thread={thread} removeThread={removeThread}></Thread>
            })}
            {(questionThreads.length < 5) ? <input placeholder="Add Thread ..." onKeyUp={(e) => {
              onKeyPress(e);
            }}/> : null}


          </div>
        </div> : null}

        {/*<div className={styles.submitBtn}>*/}
          <Button  className={styles.submitBtn} onClick={onSubmit}>
            Submit
          </Button>
        {/*</div>*/}



      </div>

      {/*</form>*/}
    </div>
  )
}

export default QuestionInput;