/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from 'react-bootstrap';
import styles from './styles.css';


// TODO add menu click function prop and action
const DefaultMenuItem = ({title, onClick}) =>
  <MenuItem title={title} className={styles.menuItem} onSelect={onClick}>
    {title}
  </MenuItem>;

MenuItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default DefaultMenuItem;