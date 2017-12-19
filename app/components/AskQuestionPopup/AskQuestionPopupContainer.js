/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import { connect } from 'react-redux'

import { hideAskQuestionPopup } from '../../actions/AskQuestionPopup';

import AskQuestionPopup from './AskQuestionPopup';

const mapStateToProps = function (state) {
  return {
    askQuestionPopup: state.askQuestionPopup,
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    hideAskQuestionPopup: () => {
      dispatch(hideAskQuestionPopup());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AskQuestionPopup)