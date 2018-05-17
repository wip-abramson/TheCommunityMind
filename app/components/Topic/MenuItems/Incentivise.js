/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const Incentivise = ({topicId}) =>
  <MenuItem title="Incentivise" onClick={() => console.log("Incentivise")}/>;

Incentivise.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default Incentivise;