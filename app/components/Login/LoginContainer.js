/**
 * Created by will on 12/05/17.
 */
import React from 'react'
import Login from './Login'
import {compose, graphql} from "react-apollo";
import {loginMutation} from '../../graphql/mutations';

var container = React.createClass({
  getInitialState () {
    return {
      username: '',
      password: '',
    }
  },

  handleUsernameChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      {username: event.target.value}
    ))
  },
  handlePasswordChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      {password: event.target.value}
    ))
  },

  submitForm () {
    console.log("Form", this.state.username, this.state.password)
    this.props.login({variables: {
      username: this.state.username,
      password: this.state.password,

    }})
  },

  render () {
    return(
      <Login
        username={this.state.username}
        password={this.state.password}
        onPasswordChange={this.handlePasswordChange}
        onUsernameChange={this.handleUsernameChange}
        submitForm={this.submitForm}
      />
    )
  }
  })

export default compose(
  graphql(loginMutation, {
    name: "login"
  })
)(container);

