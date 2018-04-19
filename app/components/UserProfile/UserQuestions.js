/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import UserQuestionsList from './QuestionLists/UserQuestionsList';
import StarredQuestionsList from './QuestionLists/StarredQuestionsList';

import { LATEST, STAR } from './viewLabels';

const UserQuestions = (props) => {

  var questionLst;
  if (props.questionView === LATEST) {
    questionLst = <UserQuestionsList userId={props.userId}/>
  }
  if (props.questionView === STAR) {
    questionLst =  <StarredQuestionsList userId={props.userId}/>

  }
  return (
    <div>
      <button onClick={() => {props.onViewChange(LATEST)}}>Latest</button>


      <button onClick={() => {props.onViewChange(STAR)}}>Starred Questions</button>


      {questionLst}

    </div>
  )
}

UserQuestions.propTypes = {
  userId: PropTypes.string,
  onViewChange: PropTypes.func.isRequired,

}

export default UserQuestions;