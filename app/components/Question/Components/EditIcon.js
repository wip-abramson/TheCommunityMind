/**
 * Created by will on 12/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaEdit from 'react-icons/lib/fa/edit';

import styles from '../styles.css';

const EditIcon = ({ canEdit, editQuestion }) =>
  <span>
    { canEdit ?
      <FaEdit
        className={styles.icon}
        onClick={editQuestion}
      />
      : null }
  </span>;
  
EditIcon.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  editQuestion: PropTypes.func.isRequired,
};

export default EditIcon;
  
  