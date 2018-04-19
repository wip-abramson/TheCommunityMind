/**
 * Created by will on 10/03/18.
 */
import React from 'react'
import PropTypes from 'prop-types';

import StarIcon from './Components/StarIcon';
import ThinkIcon from './Components/ThinkIcon';
import EditIcon from './Components/EditIcon';
import QuestionOwner from './Components/QuestionOwner';
import DeleteIcon from './Components/DeleteIcon';
import AskQuestionIcon from './Components/AskQuestionIcon';

import styles from './styles.css';

const Question = ({ question, starQuestion, unstarQuestion, watchQuestion, unwatchQuestion, askQuestion, editQuestion, deleteQuestion }) => {
  return (
    <div className={styles.questionBox}>

      <div className="topRow">
        <QuestionOwner owner={question.owner}/>
        <DeleteIcon canDelete={question.ownedByCurrentUser} deleteQuestion={() => deleteQuestion(question)}/>
      </div>
      <div className="question">
        {formatQuestion(question.questionText)}
      </div>
      <div className="bottomRow">
        <StarIcon
          starCount={question.stars}
          canStar={question.starredByCurrentUser}
          starQuestion={() => starQuestion(question)}
          unstarQuestion={() => unstarQuestion(question)}
        />
        <ThinkIcon
          canThink={! question.watchedByCurrentUser}
          thinkAboutQuestion={() => watchQuestion(question)}
          forgetAboutQuestion={() => unwatchQuestion(question)}
        />
        <EditIcon canEdit={question.ownedByCurrentUser} editQuestion={() => editQuestion()}/>
        <AskQuestionIcon canAskQuestion={true} askQuestion={askQuestion}/>
      </div>


    </div>
  )
};

function formatQuestion(question) {
  let newQuestion = question[0].toUpperCase() + question.substring(1)

  if (newQuestion[newQuestion.length] != "?") {
    newQuestion += "?";
  }
  return newQuestion;
}

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    starredByCurrentUser: PropTypes.bool.isRequired,
    watchedByCurrentUser: PropTypes.bool.isRequired,
    ownedByCurrentUser: PropTypes.bool.isRequired,
    stars: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  watchQuestion: PropTypes.func.isRequired,
  unwatchQuestion: PropTypes.func.isRequired,
};

export default Question;