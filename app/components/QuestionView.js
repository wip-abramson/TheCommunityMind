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
          if (props.link) {
            return (
              <li key={"id-"+question.id}>
                <Link
                  onClick={() => {
                    props.onSelectQuestion(question)
                  }}
                  to={props.link}>

                  {question.question}
                </Link>
              </li>)
          }
          else {
            return (
              <li key={"id-"+question.id}
                  onClick={() => {
                    props.onSelectQuestion(question)
                  }}>

                  {question.question}
              </li>)
          }

        })}
      </ul>
    </div>
  )
}

QuestionView.PropTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  onAskQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }).isRequired).isRequired
}

module.exports = QuestionView
