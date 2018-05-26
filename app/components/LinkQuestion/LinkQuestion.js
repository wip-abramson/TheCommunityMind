/**
 * Created by will on 22/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router'

import QuestionText from '../QuestionText/QuestionText';


const LinkQuestion = ({cssClassName, question, onSelectQuestion}) =>
  <div className={cssClassName} onClick={() => browserHistory.push({pathname: "/question", query: {questionId: question.id}})}>
    <QuestionText questionText={question.questionText}/>
  </div>;





export default LinkQuestion