import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import QuestionInput from '../components/QuestionInput'

function WhatIf (props) {
  return (
    <div>
      <h2>What If?</h2>
      <QuestionInput
        placeholder="What if ...?"
        onAskQuestion={props.onAskQuestion}>
      </QuestionInput>
      <ul>
        {props.whatIfs.map(function(whatif){
          return (
            <li key={"whatif-"+whatif.id}>
              <Link
                to="whatif"
                onClick={() => {
                  props.onSelectWhatIf(whatif)
                }}>
                {whatif.question}
              </Link>
            </li>)
        })}
      </ul>
    </div>
  )
}

WhatIf.PropTypes = {
  onSelectWhatIf: PropTypes.func.isRequired,
  onAskQuestion: PropTypes.func.isRequired,
  whatIfs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired
}

module.exports = WhatIf;
