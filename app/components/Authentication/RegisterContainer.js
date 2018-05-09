/**
 * Created by will on 09/05/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { addUserMutation } from '../../graphql/mutations/user.mutations';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { loginSuccess } from '../../actions/Auth';
import Authentication from './AuthenticationUI'

import Notifications from 'react-notification-system-redux';
import { registerSuccessNotification } from '../../notifications/success.notification';
import { registerFailedNotification } from '../../notifications/error.notifications';


const mapDispatchToProps = function (dispatch) {
  return {
    loginUser: function (user) {
      dispatch(loginSuccess(user));
      browserHistory.push("/");
      registerSuccessNotification.message = "Welcome " + user.username  + ". Airdrop in progress";
      dispatch(Notifications.success(registerSuccessNotification));
    },
    registerFailed: function(title) {

      registerFailedNotification.title = title;
      dispatch(Notifications.error(registerFailedNotification));

    }

  }
};

let container = React.createClass({

  register (email, password, username) {
    this.props.addUser({
      username,
      password,
      email,
    }).then(res => {

      if (res.data.register) {
        this.props.loginUser(res.data.register);
        var object = {value: res.data.register.jwt, timestamp: new Date().getTime()}

        localStorage.setItem("token", JSON.stringify(object));
      } else {
        console.log("Register failed", res.data);

        this.props.registerFailed("Register Failed!")
      }
    }).catch(res => {


      const errors = res.graphQLErrors.map((error) => {
        this.props.registerFailed(error.message);
        return error;
      });
      return errors
      // this.setState({ errors });
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

