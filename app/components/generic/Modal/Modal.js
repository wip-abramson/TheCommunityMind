/**
 * Created by will on 11/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/fa/close';

import styles from './styles.css';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className={[styles.backdrop, "backdrop"].join(' ')}>
        <div className={[styles.modalStyle, "modal"].join(' ')}>
          {this.props.children}
          {this.props.onClose ?
            <FaClose className={styles.closeButton} size={30} onClick={this.props.onClose}/>
            : null}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;