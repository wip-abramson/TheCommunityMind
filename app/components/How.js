import React from 'react'
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

module.exports = How;
