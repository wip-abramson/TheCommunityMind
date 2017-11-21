/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import {FormGroup, Col, Button, Row, FormControl} from 'react-bootstrap';
import Thread from '../../../Thread/Thread';

const QuestionInput = ({ questionText, questionThreads, placeholder, onKeyPress, onTextChange, onSubmit, removeThread}) => {

  return (
    <div style={{padding: "30px", border: "1px solid black", borderRadius: "20px", margin: "5px"}}>

        <FormControl
          type="text"
          placeholder={placeholder}
          value={questionText}
          onChange={(e) => onTextChange(e)}
          />

        <p>Link your question into the community mind by adding up to five threads</p>
        <div>
          {questionThreads.map((thread) => {
            console.log(thread.name)
            return <Thread key={thread.id} thread={thread} removeThread={removeThread}></Thread>
          })}
          {(questionThreads.length < 5) ?<input placeholder="Add Thread ..." onKeyUp={(e) => {onKeyPress(e);}}/> : null}
          <div style={{float: "right", marginBottom: "30px"}} >
            <Button onClick={onSubmit}>
              Submit
            </Button>
          </div>


        </div>

      {/*</form>*/}
    </div>
  )
}

export default QuestionInput;