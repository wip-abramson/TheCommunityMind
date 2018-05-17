/**
 * Created by will on 11/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const OstBalance = ({ totalBalance, airdroppedBalance }) =>
  <div className={styles.balanceContainer}>
    <div className={styles.ostText}>Inspiration</div>
    <div>
      <p>{"Total Balance : "  + totalBalance}</p>
      <p>{"Airdropped Balance : " + airdroppedBalance}</p>
    </div>
  </div>;

OstBalance.propTypes = {
  totalBalance: PropTypes.number.isRequired,
  airdroppedBalance: PropTypes.number.isRequired,
};

export default OstBalance;