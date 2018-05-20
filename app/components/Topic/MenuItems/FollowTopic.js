/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import DefaultMenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const FollowTopic = ({topicId, followTopic, unfollowTopic, canFollow}) =>
  <DefaultMenuItem title={canFollow ? "Follow Topic" : "Unfollow Topic"}
                   onClick={() => {console.log("Follow"); canFollow ? followTopic(topicId) : unfollowTopic(topicId)}}/>;

FollowTopic.propTypes = {
  topicId: PropTypes.string.isRequired,
  canFollow: PropTypes.bool.isRequired,
  unfollowTopic: PropTypes.func.isRequired,
  followTopic: PropTypes.func.isRequired
};

export default FollowTopic;