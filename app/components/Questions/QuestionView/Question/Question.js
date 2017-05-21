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

  if (props.link) {
    return (
      <div style={style}>
        <Link
          onClick={() => {
            props.onSelectQuestion(props.question)
          }}
          to={props.link}>

          {formatQuestion(props.value)}
        </Link>
        <Star count={props.stars}/>
        <Owner owner={props.owner}/>
      </div>
    )
  }
  else {
    return (
      <div style={style}>
        {formatQuestion(props.value)}
        <Star count={props.stars}/>
        <Owner owner={props.owner}/>
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
  console.log(question)
  if (question.charAt(question.length - 1) !== '?') {
    question = '"' + question + '?' + '"';
  }
  return question.charAt(0).toUpperCase() + question.substring(1)
}

