/**
 * Created by will on 12/05/17.
 */
import React from 'react'
import Login from './Login'
import { compose, graphql } from "react-apollo";
import { loginMutation } from '../../graphql/mutations';
import { browserHistory } from 'react-router'
import { connect } from "react-redux";
import {loginUser} from '../../actions/User';

const mapStateToProps = function () {
  return {
    // parentId: state.currentTopic.id
  }
};
const mapDispatchToProps = function (dispatch) {
  return {
    loginUser: function (user) {
      dispatch(loginUser(user))
    }
  }
};

var container = React.createClass({
  getInitialState () {
    return {
      email: '',
      password: '',
    }
  },

  handleEmailChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      { email: event.target.value }
    ))
  },
  handlePasswordChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      { password: event.target.value }
    ))
  },

  submitForm (e) {
    e.preventDefault()
    console.log("Form", this.state.email, this.state.password)
    this.props.login({ email: this.state.email, password: this.state.password }).then((res) => {
      // check if user logged in
      if(res.data.login) {
        this.props.loginUser(res.data.login)
        browserHistory.push("/");
      } else {

        console.log("Login failed")
      }
    })

  },

  render () {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
        onPasswordChange={this.handlePasswordChange}
        onEmailChange={this.handleEmailChange}
        submitForm={this.submitForm}
      />
    )
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(loginMutation, {
      props: ({ ownProps, mutate }) => ({
        login: ({ email, password }) => {
          return mutate({
            variables: { email, password }
          })
        }

      })
    }
  )
)(container);

