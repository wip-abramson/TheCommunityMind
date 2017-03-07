import React, { PropTypes } from 'react'
import QuestionInput from '../components/QuestionInput'

function How (props) {
  return (
    <div>
      <h2>How?</h2>
      <QuestionInput
        question={props.question}
        onUpdateQuestion={props.onUpdateQuestion}
        placeholder={props.placeholder}
        onAskQuestion={props.onAskQuestion}>

      </QuestionInput>
      <ul>
        {props.hows.map(function(how){
          return <li key={"how-"+how.id}>{how.question}</li>
        })}
      </ul>
    </div>

  )
}

How.PropTypes = {
  question: PropTypes.string.isRequired,
  onUpdateQuestion: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onAskQuestion: PropTypes.func.isRequired,
  hows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired
}


module.exports = How;
