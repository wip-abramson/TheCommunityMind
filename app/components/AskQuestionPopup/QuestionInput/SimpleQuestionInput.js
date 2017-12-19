import React, { PropTypes } from "react";
import TextInput from "../../generic/TextInput";

function QuestionInput(props) {

  const style = {
    height: 50
  }

  const handleSubmit = (evt) => {
    props.createQuestion(evt.trim());
  }
  return (

    <div style={style}>
      <TextInput
        placeholder={props.placeholder}
        submitName="Ask"
        onSubmit={handleSubmit}
      />

    </div>
  )
}

QuestionInput.propTypes = {

  placeholder: PropTypes.string.isRequired,
  createQuestion: PropTypes.func.isRequired,
}

export default QuestionInput;