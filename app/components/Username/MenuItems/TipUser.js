/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const TipUser = ({userId}) =>
  <MenuItem title="Tip" onClick={() => console.log("Tip User")}/>;

TipUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default TipUser;