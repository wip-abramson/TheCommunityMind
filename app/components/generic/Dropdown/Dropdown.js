/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {DropdownButton} from 'react-bootstrap';

import styles from './styles.css';

const Dropdown = ({title, fontSize, ...props}) =>
  <DropdownButton
    noCaret
    className={styles.dropdown}
    title={title}
    style={{fontSize: fontSize}}
  >
    {props.children}
  </DropdownButton>;

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired
};

export default Dropdown;