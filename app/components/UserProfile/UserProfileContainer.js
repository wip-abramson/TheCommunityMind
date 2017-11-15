/**
 * Created by will on 14/11/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";

import USER_QUERY from '../../graphql/querys/user.query'

import UserInformation from './UserInformation'

const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
  }
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  graphql(USER_QUERY, {
    options: (props) => ({
      variables: { userId: props.location.query.userId },
      // pollInterval: 100000
    }),
    props: ({ ownProps, data: { loading, error, user } }) => ({
      loading,
      error,
      user,
      // refetchQuery: USER_QUERY,
    })
  })
)(UserInformation)


