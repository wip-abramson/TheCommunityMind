/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import { Button, FormControl } from 'react-bootstrap';


import styles from './questionInput.css';

const QuestionInput = ({ questionText, placeholder, onTextChange, onSubmit, focus }) => {

  return (
    <div
      // style={{ padding: "30px", border: "1px solid black", borderRadius: "20px", margin: "5px" }}
    >

      <FormControl
       inputRef={input => input && input.focus()}
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


          <Button  className={styles.submitBtn} onClick={onSubmit}>
            Submit
          </Button>
        </div>

    </div>
  )
}

export default QuestionInput;