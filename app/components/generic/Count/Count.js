/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Badge} from 'react-bootstrap';

import styles from './styles.css';

const Count = ({amount, toolTipMessage}) =>
  <Badge data-tip={amount + " " + toolTipMessage} className={styles.badge}>{amount}</Badge>;

Count.propTypes = {
  amount: PropTypes.number.isRequired,
  toolTipMessage: PropTypes.string.isRequired
};

export default Count;