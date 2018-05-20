/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import DefaultMenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const FollowUser = ({userId, canFollow, followUser, unfollowUser}) =>
  <DefaultMenuItem title={canFollow ? "Follow" : "Unfollow"}
                   onClick={() => {canFollow ? followUser(userId) : unfollowUser(userId)}}/>;

FollowUser.propTypes = {
  userId: PropTypes.string.isRequired,
  canFollow: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

export default FollowUser;