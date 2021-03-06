/**
 * Created by will on 12/05/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { loginMutation } from '../../graphql/mutations/user.mutations';
import { browserHistory } from 'react-router'
import { connect } from "react-redux";
import { loginSuccess } from '../../actions/Auth';
import Authentication from './AuthenticationUI';

import Notifications from 'react-notification-system-redux';
import { loginFailedNotification } from '../../notifications/error.notifications'
import { loginSuccessNotification } from '../../notifications/success.notification';

const mapDispatchToProps = function (dispatch) {
  return {
    loginUser: function (user) {
      dispatch(loginSuccess(user))
      browserHistory.push("/");
      loginSuccessNotification.message = "Welcome back " + user.username;
      dispatch(Notifications.success(loginSuccessNotification));
    },
    loginFailed: function(message) {
      loginFailedNotification.message = message;
      dispatch(Notifications.error(loginFailedNotification));
    }

  }
};

let container = React.createClass({

  login(email, password) {
    this.props.login({ email, password }).then((res) => {
      // check if user logged in

      if (res.data.login) {
        // self.context.store.dispatch(Notifications.success(loginFailed))

        this.props.loginUser(res.data.login);

        var object = {value: res.data.login.jwt, timestamp: new Date().getTime()}
        localStorage.setItem("token", JSON.stringify(object));
      } else {
        // show failure to user

        this.props.loginFailed();
        console.log("Authentication failed")
      }
    })
      .catch(error => {
        console.log(error, "login failed")
      })
  },

  render () {


    return (
      <Authentication
        authenticate={this.login}
        submitLabel="Login"
        isRegister={false}
      />
    )
  }
});


export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  graphql(loginMutation, {
      props: ({ ownProps, mutate }) => ({
        login: ({ email, password }) => {
          return mutate({
            variables: { email, password }
          })
            .catch(res => {
              // catches any error returned from mutation request
              // ownProps.unAuthorized();

              const errors = res.graphQLErrors.map((error) => {
                console.log(error.message)


                ownProps.loginFailed(error.message);

                return error;
              });
              return errors
              // this.setState({ errors });
            })
        }

      })

    }
  )
)(container);

