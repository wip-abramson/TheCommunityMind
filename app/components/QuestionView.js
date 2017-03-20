import React, { PropTypes } from 'react'
import QuestionInput from '../components/QuestionInput'
import { Link } from 'react-router'


function QuestionView(props) {
  const Tag = props.link ? "Link" : "p"


  return (
    <div>
      <QuestionInput
        placeholder={props.placeholder}
        onAskQuestion={props.onAskQuestion}>
      </QuestionInput>
      <ul>
        {props.questions.map(function(question){
          return (
            <li key={"whatif-"+question.id}>
              <Link
                onClick={() => {
                  props.onSelectQuestion(question)
                }}
                to={props.link}>

                {question.question}
              </Link>
            </li>)
        })}
      </ul>
    </div>
  )
}

module.exports = QuestionView
