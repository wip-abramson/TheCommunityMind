/**
 * Created by will on 18/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import QuestionFocus from './QuestionFocus';
import QuestionInputFocus from './QuestionInputFocus'

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification, unableToNavPrevious } from '../../notifications/error.notifications';

const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    unAuthorized: () => {
      dispatch(Notifications.error(unauthorizedErrorNotification))
    },
    unableToNavBackwards: () => {
      dispatch(Notifications.error(unableToNavPrevious))

    }
  }
}


class QuestionFocusContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInput: false,
      previousQuestionId: null
    };

    this.toggleIsInput = this.toggleIsInput.bind(this);
    this.handleNavBackwards = this.handleNavBackwards.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.question && this.props.question.id !== prevProps.question.id) {
      console.log("PREVIOUS QUESTION", prevProps.question.id);
      this.setState({
        isInput: false,
        previousQuestionId: prevProps.question.id
      })
    }
  }

  toggleIsInput() {
    this.setState({
      isInput: !this.state.isInput
    })
  }

  handleNavBackwards() {
    if(this.state.previousQuestionId) {
      this.props.onPreviousQuestion(this.state.previousQuestionId)
    }
    else {
      this.props.unableToNavBackwards();
    }
  }

  render() {
    if (this.props.loading) {
      return <div/>
    }
    else if (this.props.error) {
      return <h1>Error</h1>
    }
    return (
      this.state.isInput ?
        <QuestionInputFocus toggleIsInput={this.toggleIsInput} questioningId={this.props.question.id}/>
        :
        <QuestionFocus
          onNextQuestion={this.props.onNextQuestion}
          onPreviousQuestion={this.handleNavBackwards}
          question={this.props.question}
          toggleIsInput={this.toggleIsInput}/>
    )
  }
}

// TODO fill in shape of question
QuestionFocusContainer.propTypes = {
  question: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onNextQuestion: PropTypes.func.isRequired,
  onPreviousQuestion: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionFocusContainer);