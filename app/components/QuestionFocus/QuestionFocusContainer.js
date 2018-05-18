/**
 * Created by will on 18/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import QuestionFocus from './QuestionFocus';
import QuestionInputFocus from './QuestionInputFocus'

class QuestionFocusContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInput: false
    };

    this.toggleIsInput = this.toggleIsInput.bind(this);
  }

  toggleIsInput() {
    console.log("Toggle input")
    this.setState({
      isInput: !this.state.isInput
    })
  }

  render() {
    return (
      this.state.isInput ?
        <QuestionInputFocus toggleIsInput={this.toggleIsInput} questioningId="1"/>
        :
        <QuestionFocus toggleIsInput={this.toggleIsInput} focussedId="1"/>
    )
  }
}

// QuestionFocusContainer.propTypes = {
//   focussedId: PropTypes.string.isRequired
// };

export default QuestionFocusContainer;