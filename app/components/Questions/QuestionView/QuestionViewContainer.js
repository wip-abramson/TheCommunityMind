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

let container = React.createClass({

  componentDidMount() {
    this.props.setQuestionType();
  },

  render() {
    return (
      <QuestionView
        createQuestion={this.props.createQuestion}
        onSelectQuestion={this.props.onSelectQuestion}
        connection={this.props.connection}
        loading={this.props.loading}
      />
    )
  }
})

