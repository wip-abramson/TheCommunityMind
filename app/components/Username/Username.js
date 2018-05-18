/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import Count from '../generic/Count/Count';
import Dropdown from '../generic/Dropdown/Dropdown';
import ViewProfile from './MenuItems/ViewProfile';
import TipUser from './MenuItems/TipUser';
import FollowUser from './MenuItems/FollowUser';

//TODO change username to user object, count should come from there
//TODO Make user a clickable dropdown component
// TODO username text not bit enough

const Username = ({user}) =>
  <div className={styles.username}>
    <Dropdown title={user.username} fontSize={22}>
      <FollowUser userId={user.id}/>
      <TipUser userId={user.id}/>
      <ViewProfile userId={user.id}/>
    </Dropdown>
    <Count amount={11}/>
  </div>;

Username.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default Username;