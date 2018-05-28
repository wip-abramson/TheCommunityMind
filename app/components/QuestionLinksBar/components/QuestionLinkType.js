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
const QuestionLinkType = ({hasBorder, linkType, isInput, selectLinkType, idSelected}) =>
{
  return (
    <div className={hasBorder ? styles.questionLinkType : styles.questionLinkTypeNoBorder}
         onClick={() => selectLinkType(linkType)}>
      {linkType.linkType}
      {isInput ?
        <Checkbox
          isSelected={idSelected === linkType.id}
          selectCheckbox={() => selectLinkType(linkType)}/>
        : <Count amount={linkType.amount} toolTipMessage={linkType.linkType + "s"}/>}
    </div>
  )
};


QuestionLinkType.propTypes = {
  linkType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    linkType: PropTypes.string.isRequired,
    amount: PropTypes.number
  }).isRequired,
  hasBorder: PropTypes.bool.isRequired,
  isInput: PropTypes.bool.isRequired,
  selectLinkType: PropTypes.func.isRequired,
  idSelected: PropTypes.string.isRequired,
};

export default QuestionLinkType;