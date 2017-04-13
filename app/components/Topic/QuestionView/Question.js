import React, {PropTypes} from "react";
import {Link} from "react-router";

export default function Question(props) {
  if (props.link) {
    return (
      <div>
        <Link
          onClick={() => {
            props.onSelectQuestion(props.question)
          }}
          to={props.link}>

          {formatQuestion(props.children)}
        </Link>
      </div>
    )
  }
  else {
    return (
      <div>
        {formatQuestion(props.children)}
      </div>
    )
  }

}


Question.PropTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  link: PropTypes.string,
  question: PropTypes.string.isRequired
}

function formatQuestion(question) {

  if (question.charAt(question.length - 1) !== '?') {
    question = question + '?'
  }
  return question.charAt(0).toUpperCase() + question.substring(1)
}

