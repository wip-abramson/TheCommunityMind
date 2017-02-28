import React from 'react'
import { Link } from 'react-router'
import QuestionInput from '../components/QuestionInput'

function WhatIf (props) {
  return (
    <div>
      <h2>What If?</h2>
      <QuestionInput
        question={props.question}
        onUpdateQuestion={props.onUpdateQuestion}
        placeholder={props.placeholder}
        onAskQuestion={props.onAskQuestion}>
      </QuestionInput>
      <ul>
        {props.whatIfs.map(function(whatif){
          return <li key={"whatif-"+whatif.id}><Link to="whatif">{whatif.question}</Link></li>
        })}
      </ul>
    </div>


  )
}

module.exports = WhatIf;
