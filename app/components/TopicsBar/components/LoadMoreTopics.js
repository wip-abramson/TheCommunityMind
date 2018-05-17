/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import FaRightArrow from 'react-icons/lib/fa/arrow-right';


import styles from '../styles.css';

// TODO make right arrow click load more topics
const LoadMoreTopics = ({isMore}) =>
  <div className={styles.loadMoreContainer} >
    {isMore ? <FaRightArrow size={15}/> : null}
  </div>;

export default LoadMoreTopics;