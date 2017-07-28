/**
 * Created by will on 09/05/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import Register from './Register';
import { addUserMutation } from '../../graphql/mutations';
import { browserHistory } from 'react-router';

var container = React.createClass({

  getInitialState () {
    return {
      username: '',
      password: '',
      email: '',
    }
  },

  handleUsernameChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      { username: event.target.value }
    ))
  },
  handlePasswordChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      { password: event.target.value }
    ))
  },
  handleEmailChange (event) {
    this.setState(Object.assign(
      {},
      this.state,
      { email: event.target.value }
    ))
  },

  submitForm (e) {
    e.preventDefault();
    console.log("Form", this.state.username, this.state.password, this.state.email)
    this.props.addUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }).then(res => {

      console.log(res);
      if(res.data.register) {
        browserHistory.push("/");
      } else {
        console.log("Register failed")
      }
    })

  },

  render () {
    return (
      <Register
        username={this.state.username}
        password={this.state.password}
        email={this.state.email}
        onPasswordChange={this.handlePasswordChange}
        onUsernameChange={this.handleUsernameChange}
        onEmailChange={this.handleEmailChange}
        submitForm={this.submitForm}
      />
    )
  }
})

export default compose(
  graphql(addUserMutation, {
    props: ({ ownProps, mutate }) => ({
      addUser: ({ email, password, username }) => {
        return mutate({
          variables: { email, password, username }
        });
      }
    })
  })
)(container)

