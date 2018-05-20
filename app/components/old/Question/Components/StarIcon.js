/**
 * Created by will on 23/04/17.
 */
import React from "react";
import PropTypes from 'prop-types';
import FaStar from "react-icons/lib/fa/star";

import styles from '../styles.css';

const StarIcon = ({ canStar, starQuestion, unstarQuestion, starCount }) => {

  return (
    <span>
      <FaStar
        className={canStar ? styles.icon && styles.starred : styles.icon}
        onClick={ canStar ? unstarQuestion : starQuestion }
      />
      <span id="starCount">{starCount}</span>
    </span>
  )
}

StarIcon.propTypes = {
  canStar: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  starCount: PropTypes.number.isRequired,
}

export default StarIcon