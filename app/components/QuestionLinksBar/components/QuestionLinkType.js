/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

import Count from '../../generic/Count/Count';


//TODO potentially generalize
// TODO enable switch between count and checkbox depending on if in input mode
const QuestionLinkType = ({hasBorder, linkType, amount}) =>
  <div className={hasBorder ? styles.questionLinkType : styles.questionLinkTypeNoBorder}>
    {linkType}
    <Count amount={amount}/>
  </div>;

QuestionLinkType.propTypes = {
  linkType: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  hasBorder: PropTypes.bool.isRequired
};

export default QuestionLinkType;