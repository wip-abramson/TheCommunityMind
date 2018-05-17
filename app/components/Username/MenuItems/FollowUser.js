/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const FollowUser = ({userId}) =>
  <MenuItem title="Follow" onClick={() => console.log("Follow User")}/>;

FollowUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default FollowUser;