/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

class TopicInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicInput: ""
    };

    this.handleTopicInputChange = this.handleTopicInputChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleTopicInputChange(evt) {
    this.setState({
      topicInput: evt.target.value
    })
  }

  clearInput() {
    this.setState({
      topicInput: ""
    })
  }

  render() {
    return (
      <div className={styles.topicInputContainer} >
        <input
          className={styles.topicInput}
          placeholder="Suggest Topic"
          onChange={this.handleTopicInputChange}
          value={this.state.topicInput}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              this.clearInput();
              this.props.onEnter(this.state.topicInput);
            }
          }}/>
      </div>
    );
  }
}

TopicInput.propTypes = {
  onEnter: PropTypes.func.isRequired
};

export default TopicInput;