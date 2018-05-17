/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const ApproveLink = ({topicId}) =>
  <MenuItem title="Approve Link" onClick={() => console.log("Approve")}/>;

ApproveLink.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default ApproveLink;