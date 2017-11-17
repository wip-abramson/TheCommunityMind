/**
 * Created by will on 16/11/17.
 */
import React from 'react';
import QuestionList from '../Questions/QuestionView/QuestionList';

export default (props) => {

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
