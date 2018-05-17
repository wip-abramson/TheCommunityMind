/**
 * Created by will on 12/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';

import styles from '../styles.css';

import Count from '../../generic/Count/Count';


//TODO get a better icon for this
const ThinkIcon =  ({ canThink, thinkAboutQuestion, forgetAboutQuestion }) =>
  <span>
    <FaEye
      size={35}
      className={canThink ? styles.icon : styles.thinkingIcon}
      onClick={canThink ? thinkAboutQuestion : forgetAboutQuestion}
    />
    <Count amount={23}/>
  </span>;

ThinkIcon.propTypes = {
  canThink: PropTypes.bool.isRequired,
  thinkAboutQuestion: PropTypes.func.isRequired,
  forgetAboutQuestion: PropTypes.func.isRequired,
};

export default ThinkIcon;