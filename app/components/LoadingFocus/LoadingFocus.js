/**
 * Created by will on 30/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import FocusOutline from '../generic/FocusOutline/FocusOutline';
import FocalCenterOutline from '../generic/FocalCenterOutline/FocalCenterOutline';

const LoadingFocus = () => {
  return (
    <FocusOutline>
      <FocalCenterOutline/>
    </FocusOutline>
  )
};

export default LoadingFocus;