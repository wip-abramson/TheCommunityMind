/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const FollowTopic = ({topicId}) =>
  <MenuItem title="Follow" onClick={() => console.log("Follow")}/>;

FollowTopic.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default FollowTopic;