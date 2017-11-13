import React, { PropTypes } from "react";
import { Link } from "react-router";
import Star from "./Star";
import Owner from "./Owner";

export default function Question(props) {
  var style = {
    border: "2px solid #032760",
    padding: 10,
    background: "#ffeffc",
    margin: 5,
    borderRadius: 25,
    fontSize: 20,
  }

  var questionText;

  //Only Why and What if questions have a link
  if (props.link) {
    questionText = <Link
      onClick={() => {
        props.onSelectQuestion(props.questionType)
      }}
      to={props.link}>

      {formatQuestion(props.questionType.question.question)}
    </Link>
  }
  else {
    questionText = formatQuestion(props.questionType.question.question)
  }

  return (
    <div style={style}>
      {questionText}
      <Star
        count={props.questionType.question.stars}
        starQuestion={() => {
          props.starQuestion(props.questionType)
        }}
        staredByCurrentUser={props.questionType.question.staredByCurrentUser}
      />
      <Owner owner={props.questionType.question.owner}/>
    </div>
  )

}

Question.propTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  link: PropTypes.string,
  questionType: PropTypes.shape({
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      staredByCurrentUser: PropTypes.bool.isRequired,
      stars: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired,
  starQuestion: PropTypes.func.isRequired
}

function formatQuestion(question) {
  console.log(question)
  if (question.charAt(question.length - 1) !== '?') {
    question = '"' + question + '?' + '"';
  }
  return question.charAt(0).toUpperCase() + question.substring(1)
}

