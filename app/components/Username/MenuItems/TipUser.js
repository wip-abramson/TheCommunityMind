/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/DefaultMenuItem/DefaultMenuItem';

//TODO change onClick to real function
const TipUser = ({userId, tipUser}) =>
  <MenuItem title="Tip" onClick={() => tipUser(userId)}/>;

TipUser.propTypes = {
  userId: PropTypes.string.isRequired,
  tipUser: PropTypes.func.isRequired
};

export default TipUser;