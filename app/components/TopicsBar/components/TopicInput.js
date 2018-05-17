/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

const TopicInput = ({topics}) =>
  <div className={styles.topicInput} >
    <input placeholder="Suggest Topic"/>
  </div>

export default TopicInput;