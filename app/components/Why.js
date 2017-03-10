import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import QuestionInput from '../components/QuestionInput'

function Why (props) {
  return (
    <div>
      <h2>Why?</h2>
      <QuestionInput
        placeholder="Why ...?"
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

Why.PropTypes = {
  onAskQuestion: PropTypes.func.isRequired,
  hows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired
}

module.exports = Why;
