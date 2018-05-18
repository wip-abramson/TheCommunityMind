/**
 * Created by will on 17/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Checkbox = ({ selectCheckbox, isSelected }) => {
  return (
    <span className={styles.checkbox}>
    <input type="checkbox" checked={isSelected} onClick={selectCheckbox}/>
  </span>
  )
};

Checkbox.propTypes = {
  selectCheckbox: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default Checkbox;