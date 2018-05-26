/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import DefaultMenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const ViewProfile = ({userId}) =>
  <DefaultMenuItem title="View Profile" onClick={() => browserHistory.push({pathname: "/profile", query: {userId: userId}})}/>;

ViewProfile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ViewProfile;