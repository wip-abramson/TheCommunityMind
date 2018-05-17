/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';


// TODO add menu click function prop and action
const MenuItem = ({title, onClick}) =>
  <div className={styles.menuItem} onClick={onClick}>
    {title}
  </div>;

MenuItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default MenuItem;