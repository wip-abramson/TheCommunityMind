/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';


const FocusType = ({focusType}) =>
  <div className={styles.focusText}>
    {focusType}
  </div>;

export default FocusType;