import React from 'react'
import { Link } from 'react-router'
import QuestionInput from '../components/QuestionInput'

function Why (props) {
  return (
    <div>
      <h2>Why?</h2>
      <QuestionInput
        question={props.question}
        onUpdateQuestion={props.onUpdateQuestion}
        placeholder={props.placeholder}
        onAskQuestion={props.onAskQuestion}>

      </QuestionInput>
      <ul>
        {props.whys.map(function(why){
          return <li key={'why-' + why.id}><Link to="why">{why.question}</Link></li>
        })}
      </ul>
    </div>

  )
}

module.exports = Why;
