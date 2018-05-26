/**
 * Created by will on 17/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaCheck from 'react-icons/lib/fa/check';

import styles from '../styles.css';

const AcceptQuestionIcon = ({ acceptQuestionInput }) =>
  <span>
      <FaCheck
        size={35}
        className={[styles.acceptQuestionIcon].join(" ")}
        onClick={acceptQuestionInput}
      />
  </span>;

AcceptQuestionIcon.propTypes = {
  acceptQuestionInput: PropTypes.func.isRequired
};

export default AcceptQuestionIcon;