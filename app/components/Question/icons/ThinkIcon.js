/**
 * Created by will on 12/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';

import styles from '../styles.css';

const ThinkIcon =  ({ canThink, thinkAboutQuestion }) =>
  <span>
    { canThink ?
      <FaEye
        className={styles.icon}
        onClick={thinkAboutQuestion}
      />
      : null }
  </span>;

ThinkIcon.propTypes = {
  canThink: PropTypes.bool.isRequired,
  thinkAboutQuestion: PropTypes.func.isRequired,
};

export default ThinkIcon;