/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import QuestionList from '../Questions/QuestionView/QuestionList';

import { LATEST, WHY, WHATIF, HOW } from './viewLabels';

const UserQuestions = (props) => {

  var questionLst;
  if (props.questionView === LATEST) {
    questionLst = <QuestionList questions={props.latestQuestions} onSelectQuestion={() => {}}/>
  }
  if (props.questionView === WHY ) {
    questionLst =  <QuestionList questions={props.whys} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === WHATIF) {
    questionLst =  <QuestionList questions={props.whatIfs} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === HOW) {
    questionLst =  <QuestionList questions={props.hows} onSelectQuestion={() => {}}/>

  }
  return (
    <div>
      <button onClick={() => {props.onViewChange(LATEST)}}>Latest</button>

      <button onClick={() => {props.onViewChange(WHY)}}>Whys</button>
      <button onClick={() => {props.onViewChange(WHATIF)}}>WhatIfs</button>
      <button onClick={() => {props.onViewChange(HOW)}}>Hows</button>

      {questionLst}

    </div>
  )
}

UserQuestions.propTypes = {
  whys: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  whatIfs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  hows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  latestQuestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  ),
  onViewChange: PropTypes.func.isRequired,

}

export default UserQuestions;