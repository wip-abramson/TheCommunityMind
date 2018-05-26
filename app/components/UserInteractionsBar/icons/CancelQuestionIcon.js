/**
 * Created by will on 17/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';

import styles from '../styles.css';

const CancelQuestionIcon = ({ cancelQuestionInput }) =>
  <span>
      <FaClose
        size={35}
        className={[styles.cancelQuestionIcon].join(" ")}
        onClick={cancelQuestionInput}
      />
  </span>;

CancelQuestionIcon.propTypes = {
  cancelQuestionInput: PropTypes.func.isRequired
};

export default CancelQuestionIcon;