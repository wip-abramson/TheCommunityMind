/**
 * Created by will on 20/11/17.
 *
 * Question View always needs currentUser
 */
import React from 'react';
import { connect } from 'react-redux'

import QuestionView from './QuestionView';



const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}



export default connect(
  mapStateToProps,
  null
)(QuestionView)

