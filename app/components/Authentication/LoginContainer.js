/**
 * Created by will on 12/05/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { loginMutation } from '../../graphql/mutations/mutations';
import { browserHistory } from 'react-router'
import { connect } from "react-redux";
import { loginSuccess } from '../../actions/Auth';
import Authentication from './AuthenticationUI';

const mapDispatchToProps = function (dispatch) {
  return {
    loginUser: function (user) {
      console.log(user);
      dispatch(loginSuccess(user))
      browserHistory.push("/");
    }
  }
};

let container = React.createClass({

  login(email, password) {
    console.log(email, password);
    this.props.login({ email, password }).then((res) => {
      // check if user logged in
      console.log(res.data.login)
      if (res.data.login) {
        this.props.loginUser(res.data.login);

        var object = {value: res.data.login.jwt, timestamp: new Date().getTime()}
        localStorage.setItem("token", JSON.stringify(object));
      } else {
        // show failure to user
        console.log("Authentication failed")
      }
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
        }

      })
    }
  )
)(container);

