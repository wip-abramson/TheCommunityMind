/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

import Count from '../../generic/Count/Count';
import Checkbox from '../../generic/Checkbox/Checkbox';


//TODO potentially generalize
// TODO enable switch between count and checkbox depending on if in input mode
const QuestionLinkType = ({hasBorder, linkType, amount, isInput, selectLinkType, idSelected}) =>
  <div className={hasBorder ? styles.questionLinkType : styles.questionLinkTypeNoBorder} onClick={() => selectLinkType(linkType.id)}>
    {linkType.linkType}
    {isInput ?
      <Checkbox
        isSelected={idSelected === linkType.id}
        selectCheckbox={() => {console.log("Select", linkType.id); selectLinkType(linkType.id)}}/>
      : <Count amount={amount}/>}
  </div>;

QuestionLinkType.propTypes = {
  linkType: PropTypes.shape({
    id: PropTypes.number.isRequired,
    linkType: PropTypes.string.isRequired
  }).isRequired,
  amount: PropTypes.number,
  hasBorder: PropTypes.bool.isRequired,
  isInput: PropTypes.bool.isRequired,
  selectLinkType: PropTypes.func.isRequired,
  idSelected: PropTypes.number.isRequired,
};

export default QuestionLinkType;