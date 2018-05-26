/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import UserQuestionsList from './QuestionLists/UserQuestionsList';
import StarredQuestionsList from './QuestionLists/StarredQuestionsList';

import { USERQUESTIONS, STARRREDQUESTIONS } from './viewLabels';

const UserQuestions = (props) => {

  let questionLst;
  if (props.questionView === USERQUESTIONS) {
    questionLst = <UserQuestionsList user={props.user}/>
  }
  if (props.questionView === STARRREDQUESTIONS) {
    questionLst =  <StarredQuestionsList user={props.user}/>

  }
  return (
    <div>
      <button onClick={() => {props.onViewChange(USERQUESTIONS)}}>User's Questions</button>


      <button onClick={() => {props.onViewChange(STARRREDQUESTIONS)}}>Starred Questions</button>


      {questionLst}

    </div>
  )
}

UserQuestions.propTypes = {
  user: PropTypes.shape({}).isRequired,
  onViewChange: PropTypes.func.isRequired,

};

export default UserQuestions;