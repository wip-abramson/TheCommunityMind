/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import QuestionLinkType from './components/QuestionLinkType';

const QuestionLinksBar = () =>
  <div className={styles.linksBar}>
    <QuestionLinkType hasBorder={false} linkType="Super Questions" amount={5}/>
    <QuestionLinkType hasBorder={true} linkType="Sub Questions" amount={25}/>
    <QuestionLinkType hasBorder={true} linkType="Related Questions" amount={11}/>
  </div>;

export default QuestionLinksBar;