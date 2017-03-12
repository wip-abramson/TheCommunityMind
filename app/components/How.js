import React, { PropTypes } from 'react'
import QuestionInput from '../components/QuestionInput'

var How = function(props) {

    return (
      <div>
        <h2>How?</h2>
        <QuestionInput
          placeholder="How ...?"
          onAskQuestion={props.onAskQuestion}>

        </QuestionInput>
        <ul>
          {props.hows.map(function(how) {
            return <li key={"how-"+how.id}>{how.question}</li>
          })}
        </ul>
      </div>
    )

}




module.exports = How;
