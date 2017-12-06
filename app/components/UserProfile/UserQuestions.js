/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import UserWhysList from './QuestionLists/UserWhysList';
import UserWhatIfsList from './QuestionLists/UserWhatIfsList';
import UserHowsList from './QuestionLists/UserHowsList';
import UserQuestionsList from './QuestionLists/UserQuestionsList';
import StaredQuestionsList from './QuestionLists/StaredQuestionsList';

import { LATEST, WHY, WHATIF, HOW, STAR } from './viewLabels';

const UserQuestions = (props) => {

  console.log("USERQUESTIONS")
  var questionLst;
  if (props.questionView === LATEST) {
    questionLst = <UserQuestionsList userId={props.userId}/>
  }
  if (props.questionView === WHY ) {
    questionLst =  <UserWhysList userId={props.userId}/>

  }
  if (props.questionView === WHATIF) {
    questionLst =  <UserWhatIfsList userId={props.userId}/>

  }
  if (props.questionView === HOW) {
    questionLst =  <UserHowsList userId={props.userId}/>

  }
  if (props.questionView === STAR) {
    questionLst =  <StaredQuestionsList userId={props.userId}/>

  }
  return (
    <div>
      <button onClick={() => {props.onViewChange(LATEST)}}>Latest</button>

      <button onClick={() => {props.onViewChange(WHY)}}>Whys</button>
      <button onClick={() => {props.onViewChange(WHATIF)}}>WhatIfs</button>
      <button onClick={() => {props.onViewChange(HOW)}}>Hows</button>

      <button onClick={() => {props.onViewChange(STAR)}}>Stared Questions</button>


      {questionLst}

    </div>
  )
}

UserQuestions.propTypes = {
  userId: PropTypes.String,
  onViewChange: PropTypes.func.isRequired,

}

export default UserQuestions;