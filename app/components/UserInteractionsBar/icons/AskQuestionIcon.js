/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaQuestion from 'react-icons/lib/fa/question-circle';

import styles from '../styles.css';

const AskQuestionIcon = ({ askQuestion }) =>
  <span>
      <FaQuestion
        size={35}
        className={[styles.icon, styles.askQuestionIcon].join(" ")}
        onClick={askQuestion}
      />
  </span>;

AskQuestionIcon.propTypes = {
  askQuestion: PropTypes.func.isRequired
};

export default AskQuestionIcon;