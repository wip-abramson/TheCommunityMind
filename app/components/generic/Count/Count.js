/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Badge} from 'react-bootstrap';

import styles from './styles.css';

const Count = ({amount}) =>
  <Badge className={styles.badge}>{amount}</Badge>;

Count.propTypes = {
  amount: PropTypes.number.isRequired
};

export default Count;