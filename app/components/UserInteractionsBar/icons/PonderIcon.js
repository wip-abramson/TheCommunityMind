/**
 * Created by will on 12/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaLightBulb from 'react-icons/lib/fa/lightbulb-o';

import styles from '../styles.css';

import Count from '../../generic/Count/Count';


//TODO get a better icon for this
const PonderIcon =  ({ isPondering, ponderCount, ponderQuestion, forgetAboutQuestion }) => {
  // console.log("Can Ponder", ponder)
  return (
    <span>
    <FaLightBulb
      data-tip="Ponder Question"
      size={35}
      className={isPondering ? styles.ponderingIcon : styles.icon}
      onClick={isPondering ? forgetAboutQuestion : ponderQuestion}
    />
    <Count amount={ponderCount} toolTipMessage="users pondering"/>
  </span>
  )
}


PonderIcon.propTypes = {
  isPondering: PropTypes.bool.isRequired,
  ponderCount: PropTypes.number.isRequired,
  ponderQuestion: PropTypes.func.isRequired,
  forgetAboutQuestion: PropTypes.func.isRequired,
};

export default PonderIcon;
