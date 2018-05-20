/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';

import styles from '../styles.css';

const DeleteIcon = ({ canDelete, deleteQuestion }) =>
  <span>
    { canDelete ?
      <FaClose
        className={styles.icon}
        onClick={deleteQuestion}
      />
      : null }
  </span>;

DeleteIcon.propTypes = {
  canDelete: PropTypes.bool.isRequired,
  deleteQuestion: PropTypes.func.isRequired
};

export default DeleteIcon;

