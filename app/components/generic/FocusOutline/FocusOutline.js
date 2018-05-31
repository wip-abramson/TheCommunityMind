/**
 * Created by will on 30/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import FaRightArrow from 'react-icons/lib/fa/arrow-right';
import FaLeftArrow from 'react-icons/lib/fa/arrow-left';

import styles from './styles.css';

const FocusOutline = ({children, canNavigate, navigateLeft, navigateRight, navLeftText, navRightText}) => {
  return (
    <div className={styles.focusGrid}>
      {canNavigate ? <FaLeftArrow size={30} className={styles.leftNav} onClick={navigateLeft} data-tip={navLeftText}/> : null}
      {canNavigate ? <FaRightArrow size={30} className={styles.rightNav} onClick={navigateRight} data-tip={navRightText}/> : null}

      {children}
    </div>
  )
};

FocusOutline.propTypes = {
  canNavigate: PropTypes.func.isRequired,
  navigateLeft: PropTypes.func,
  navigateRight: PropTypes.func,
  navRightText: PropTypes.string,
  navLeftText: PropTypes.string
};

export default FocusOutline;