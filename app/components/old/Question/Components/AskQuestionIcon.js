/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaQuestion from 'react-icons/lib/fa/question-circle';

import styles from '../styles.css';

const AskQuestionIcon = ({ canAskQuestion, askQuestion }) =>
  <span>
    { canAskQuestion ?
      <FaQuestion
        className={[styles.icon,styles.askQuestionIcon].join(" ")}
        onClick={askQuestion}
      />
      : null }
  </span>;

AskQuestionIcon.propTypes = {
  canAskQuestion: PropTypes.bool.isRequired,
  askQuestion: PropTypes.func.isRequired
};

export default AskQuestionIcon;