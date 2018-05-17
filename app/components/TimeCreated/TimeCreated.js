/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';


const TimeCreated = ({time}) =>
  <div className={styles.timeCreated}>
    {time}
  </div>;

TimeCreated.propTypes = {
  time: PropTypes.string.isRequired
};

export default TimeCreated;