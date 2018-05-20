/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import DefaultMenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const ApproveLink = ({topicId, canApprove, approveLink, unapproveLink}) =>
  <DefaultMenuItem
    title={canApprove ? "Approve Link" : "Unapprove Link" }
    onClick={() => {canApprove ? approveLink(topicId, 1) : unapproveLink(topicId, 1)}}/>;

ApproveLink.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default ApproveLink;