/**
 * Created by will on 09/05/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
// import Register from './Register';
import { addUserMutation } from '../../graphql/mutations/mutations';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { loginSuccess } from '../../actions/Auth';
import Authentication from './AuthenticationUI'

import Notifications from 'react-notification-system-redux';
import { registerSuccessNotification } from '../../notifications/success.notification';

const mapDispatchToProps = function (dispatch) {
  return {
    loginUser: function (user) {
      dispatch(loginSuccess(user));
      browserHistory.push("/");
      registerSuccessNotification.message = "Welcome " + user.username;
      dispatch(Notifications.success(registerSuccessNotification));
    }
  }
};

let container = React.createClass({

  register (email, password, username) {
    console.log(email,username,password)
    this.props.addUser({
      username,
      password,
      email,
    }).then(res => {

      console.log(res.data.register);
      if (res.data.register) {
        this.props.loginUser(res.data.register);
        var object = {value: res.data.register.jwt, timestamp: new Date().getTime()}

        localStorage.setItem("token", JSON.stringify(object));
      } else {
        console.log("Register failed", res.data);
        this.setState(Object.assign(
          {},
          this.state,
          { error: "Failed to register"}
        ));
      }
    })

  },

  render () {
    return (
      <Authentication
        authenticate={this.register}
        submitLabel="Register"
        isRegister={true}
      />
    )
  }
});

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
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

