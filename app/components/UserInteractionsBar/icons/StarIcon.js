/**
 * Created by will on 23/04/17.
 */
import React from "react";
import PropTypes from 'prop-types';
import FaStar from "react-icons/lib/fa/star";

import styles from '../styles.css';

import Count from '../../generic/Count/Count';

const StarIcon = ({ isStarred, starQuestion, unstarQuestion, starCount }) => {
  console.log(isStarred);
  return (
    <span>
      <FaStar
        size={35}
        className={isStarred ? styles.starredIcon : styles.icon}
        onClick={ isStarred ? unstarQuestion : starQuestion }
      />
      <Count amount={starCount}/>
    </span>
  )
};

StarIcon.propTypes = {
  isStarred: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  starCount: PropTypes.number.isRequired,
};

export default StarIcon