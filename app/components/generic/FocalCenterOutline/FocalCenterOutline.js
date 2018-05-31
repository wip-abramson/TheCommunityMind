/**
 * Created by will on 30/05/18.
 */
import React from 'react';

import styles from './styles.css';

const FocalCenterOutline = ({children}) => {
  return (
    <div className={styles.focalCenter}>
      {children}
    </div>
    )
};

export default FocalCenterOutline;