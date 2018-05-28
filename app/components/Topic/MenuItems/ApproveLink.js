/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import DefaultMenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const ApproveLink = ({topicId, canApprove, approveLink, unapproveLink, questionId, approval}) =>
  <DefaultMenuItem
    title={canApprove ? "Approve Link" : "Unapprove Link" }
    onClick={() => {canApprove ? approveLink(topicId, questionId, approval) : unapproveLink(topicId, questionId, approval)}}/>;

ApproveLink.propTypes = {
  topicId: PropTypes.string.isRequired,
  canApprove: PropTypes.bool.isRequired,
  approveLink: PropTypes.func.isRequired,
  unapproveLink: PropTypes.func.isRequired,
  questionId: PropTypes.string.isRequired,
  approval: PropTypes.number.isRequired
};

export default ApproveLink;