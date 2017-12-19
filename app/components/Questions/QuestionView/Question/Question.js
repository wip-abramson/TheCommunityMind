import React from "react";
import PropTypes from 'prop-types'
import FaQuestionCircle from 'react-icons/fa/question-circle'

import Star from "./Star";
import Owner from "./Owner";
import EditQuestion from './EditQuestion';
import QuestionText from './QuestionText';
import WatchQuestion from './WatchQuestion';

import styles from './question.css';

export default function Question(props) {

  let editQuestion;
  let watchQuestion;
  let askQuestion;
  // console.log(props)

  if (props.currentUser) {
    watchQuestion = <WatchQuestion
      watchedByCurrentUser={props.questionType.question.watchedByCurrentUser}
      watchQuestion={() => {
        props.watchQuestion(props.questionType)
      }}
      unwatchQuestion={() => {
        props.unwatchQuestion(props.questionType)
      }}

    />
    askQuestion = <div className={styles.askQuestion}>

      <FaQuestionCircle size={70}/>
    </div>

  }

  if (props.currentUser && (props.questionType.question.owner.id == props.currentUser.id)) {
    editQuestion = <EditQuestion toggleEditable={props.toggleEditable}/>
  }

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionText}>
        <QuestionText
          editable={props.editable}
          question={props.questionType.question.question}
          questionType={props.questionType}
          link={props.link}
          editQuestion={props.editQuestion}
          toggleEditable={props.toggleEditable}
          onSelectQuestion={props.onSelectQuestion}
        />
      </div>
      <div>
        <Owner owner={props.questionType.question.owner}/>

        <div className={styles.iconRow}>


          {watchQuestion}
          {editQuestion}

          <Star
            count={props.questionType.question.stars}
            starQuestion={() => {
              // props.unAuthorized();
              props.starQuestion(props.questionType)
            }}
            unstarQuestion={() => {
              props.unstarQuestion(props.questionType)
            }}
            staredByCurrentUser={props.questionType.question.staredByCurrentUser}
          />


        </div>
      </div>
      {askQuestion}


    </div>
  )

}

Question.propTypes = {
  onSelectQuestion: PropTypes.func,
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
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
}


