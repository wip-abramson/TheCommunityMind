/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import TopicsBar from '../TopicsBar/TopicsBar';
import QuestionText from '../QuestionText/QuestionText';
import QuestionLinksBar from '../QuestionLinksBar/QuestionLinksBar';

const QuestionBox = () =>
  <div className={styles.questionBox}>
    <TopicsBar topics={[{id: "12", name: "Questioning"}, {id: "13", name: "Answers"}, {id: "11", name: "Meaning"}, {id: "1", name: "Ideas"}]}/>
    <QuestionText/>
    <QuestionLinksBar/>
  </div>;

export default QuestionBox;