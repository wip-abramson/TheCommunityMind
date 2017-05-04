import React, {PropTypes} from "react";
import {FormGroup, Col, Button, FormControl} from 'react-bootstrap';

function TextInput(props) {
  let input;

  return (
    <form onSubmit={function (e) {
      e.preventDefault()
      if (!input.value.trim()) {
        return;
      }
      props.onSubmit(input.value)
      input.value = "";
    }}>

      <FormGroup>
        <Col xs={10}>
          <FormControl
            type="text"
            placeholder={props.placeholder}
            inputRef={node => {
               input = node
             }}/>

        </Col>
      </FormGroup>
      <FormGroup>
        <Col xs={2}>
          <Button bsStyle="primary" block>
            {props.submitName}
          </Button>
        </Col>
      </FormGroup>

    </form>

)
}

TextInput.PropTypes = {
  submitName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default TextInput;
