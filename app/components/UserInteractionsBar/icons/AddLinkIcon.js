/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaCodeFork from 'react-icons/lib/fa/code-fork';

import styles from '../styles.css';

const AddLinkIcon = ({ askQuestion }) =>
  <span>
      <FaCodeFork
        size={35}
        className={[styles.icon, styles.askQuestionIcon].join(" ")}
        onClick={askQuestion}
      />
  </span>;

AddLinkIcon.propTypes = {
  askQuestion: PropTypes.func.isRequired
};

export default AddLinkIcon;