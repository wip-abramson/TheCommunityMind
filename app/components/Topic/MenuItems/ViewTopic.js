/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const ViewTopic = ({topicId}) =>
  <MenuItem title="View Topic" onClick={() => console.log("View Topic")}/>;

ViewTopic.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default ViewTopic;