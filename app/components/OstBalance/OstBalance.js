/**
 * Created by will on 11/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import styles from './styles.css';

import USER_QUERY from '../../graphql/querys/user.query'

const OstBalance = ({ loading, error, user }) => {
  if (loading) {
    return <div/>
  }
  if (error) {
    return <div>Loading</div>
  }
  return (
    <div className={styles.balanceContainer}>
      <div className={styles.ostText}>Inspiration</div>
      <div>
        <p>{"Total Balance : "  + user.totalOstBalance}</p>
      </div>
    </div>
  )

};


OstBalance.propTypes = {
  totalBalance: PropTypes.number.isRequired,
  airdroppedBalance: PropTypes.number.isRequired,
};

export default graphql(USER_QUERY,{
  options: (ownProps) => {
    return ({
      variables: { userId: ownProps.userId },
      pollInterval: 100000
    });
  },
  props: ({ ownProps, data: { loading, error, user } }) => ({
    loading,
    error,
    user: user,
  })
})(OstBalance);