/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from '../Questions/QuestionView/QuestionList';

const UserQuestions = (props) => {

  var questionLst;
  if (props.questionView === "LATEST") {
    questionLst = <QuestionList questions={props.latestQuestions} onSelectQuestion={() => {}}/>
  }
  if (props.questionView === "WHYS") {
    questionLst =  <QuestionList questions={props.whys} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === "WHATIFS") {
    questionLst =  <QuestionList questions={props.whatIfs} onSelectQuestion={() => {}}/>

  }
  if (props.questionView === "HOWS") {
    questionLst =  <QuestionList questions={props.hows} onSelectQuestion={() => {}}/>

  }
  return (
    <div>
      <button onClick={() => {props.onViewChange("LATEST")}}>Latest</button>

      <button onClick={() => {props.onViewChange("WHYS")}}>Whys</button>
      <button onClick={() => {props.onViewChange("WHATIFS")}}>WhatIfs</button>
      <button onClick={() => {props.onViewChange("HOWS")}}>Hows</button>

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