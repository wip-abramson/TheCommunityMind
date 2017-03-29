import React, { PropTypes } from 'react'
import TextInput from './generic/TextInput'

function QuestionInput (props) {
  let input;

  return (

    <div className="col-sm-12">
      <TextInput
        placeholder={props.placeholder}
        submitName="Ask"
        onSubmit={props.onAskQuestion}
      />

    </div>
  )
}

QuestionInput.PropTypes = {

  placeholder: PropTypes.string.isRequired,
  onAskQuestion: PropTypes.func.isRequired
}


module.exports = QuestionInput;
