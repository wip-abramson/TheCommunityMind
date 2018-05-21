/**
 * Created by will on 21/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaTimesCircle from 'react-icons/fa/times-circle';

import styles from './styles.css';

const DeleteIcon = ({onDelete}) =>
  <span className={styles.deleteIcon} onClick={onDelete}>
        <FaTimesCircle style={{ "verticalAlign": "top" }}/>
  </span>;

DeleteIcon.propTypes = {
  deleteIcon: PropTypes.func.isRequired
};

export default DeleteIcon;
