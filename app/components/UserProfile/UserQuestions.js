/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import QuestionList from '../Questions/QuestionView/QuestionList';

import { LATEST, WHY, WHATIF, HOW, STAR } from './viewLabels';

const UserQuestions = (props) => {

  var questionLst;
  if (props.questionView === LATEST) {
    questionLst = <QuestionList edges={props.latestQuestionEdges} onSelectQuestion={() => {}}/>
  }
  if (props.questionView === WHY ) {
    questionLst =  <QuestionList edges={props.whyEdges} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === WHATIF) {
    questionLst =  <QuestionList edges={props.whatIfEdges} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === HOW) {
    questionLst =  <QuestionList edges={props.howEdges} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === STAR) {
    questionLst =  <QuestionList edges={props.staredQuestionEdges} onSelectQuestion={() => {}}/>

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
  whyEdges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.shape({
          id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      cursor: PropTypes.string,

    }).isRequired,
  ),
  whatIfEdges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.shape({
          id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      cursor: PropTypes.string,

    }).isRequired
  ),
  howEdges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.shape({
          id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      cursor: PropTypes.string,
    }).isRequired
  ),
  latestQuestionEdges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.shape({
          id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      cursor: PropTypes.string,

    }).isRequired,
  ),
  staredQuestionEdges: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    cursor: PropTypes.string,
  })),
  onViewChange: PropTypes.func.isRequired,

}

export default UserQuestions;