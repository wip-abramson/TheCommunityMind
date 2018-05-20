/**
 * Created by will on 19/12/17.
 */
import React from 'react';
import { connect } from 'react-redux'

import { hideQuestionPopup } from '../../../actions/QuestionPopup';

import QuestionPopup from './QuestionPopup';



const mapStateToProps = function (state) {
  return {
    questionPopup: state.questionPopup,
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = function (dispatch) {
  return {
    hideQuestionPopup: () => {
      dispatch(hideQuestionPopup());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionPopup)