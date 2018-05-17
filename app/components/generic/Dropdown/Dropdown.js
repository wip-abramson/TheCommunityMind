/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {DropdownButton} from 'react-bootstrap';

import styles from './styles.css';

const Dropdown = ({title, ...props}) =>
  <DropdownButton
    noCaret
    className={styles.dropdown}
    title={title}
  >
    {props.children}
  </DropdownButton>;

Dropdown.propTypes = {
  title: PropTypes.string.isRequired
};

export default Dropdown;