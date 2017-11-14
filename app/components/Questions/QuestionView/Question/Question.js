import React, { PropTypes } from "react";
import Star from "./Star";
import Owner from "./Owner";
import EditQuestion from './EditQuestion';
import QuestionText from './QuestionText';

export default function Question(props) {
  var style = {
    border: "2px solid #032760",
    padding: 10,
    background: "#ffeffc",
    margin: 5,
    borderRadius: 25,
    fontSize: 20,
  }

  var editQuestion;
  // console.log(props)

  if (props.currentUser && (props.questionType.question.owner.id == props.currentUser.id)) {
    editQuestion = <EditQuestion toggleEditable={props.toggleEditable}/>
  }


  return (
    <div style={style}>
      <QuestionText
        editable={props.editable}
        question={props.questionType.question.question}
        questionType={props.questionType}
        link={props.link}
        editQuestion={props.editQuestion}
        toggleEditable={props.toggleEditable}
      />
      <Star
        count={props.questionType.question.stars}
        starQuestion={() => {
          // props.unAuthorized();
          props.starQuestion(props.questionType)
        }}
        staredByCurrentUser={props.questionType.question.staredByCurrentUser}
      />
      <Owner owner={props.questionType.question.owner}/>

      {editQuestion}
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


