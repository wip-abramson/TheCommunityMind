/**
 * Created by will on 14/11/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";

import USER_QUERY from '../../graphql/querys/user.query'

import FOLLOW_USER_MUTATION from '../../graphql/mutations/followUser.mutation'
import UNFOLLOW_USER_MUTATION from '../../graphql/mutations/unfollowUser.mutation';

import UserInformation from './UserInformation'

const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser,
  }
};

const followUser = graphql(FOLLOW_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    followUser: (user) => {
      return mutate({
        variables: { userId: user.id },
        optimisticResponse: {
          __typename: 'Mutation',
          followUser: {
            id: user.id,
            __typename: 'User',
            followedByCurrentUser: true,
            username: user.username,
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
          // this.setState({ errors });
        })
    }
  })
})

const unfollowUser = graphql(UNFOLLOW_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unfollowUser: (user) => {
      return mutate({
        variables: { userId: user.id },
        optimisticResponse: {
          __typename: 'Mutation',
          unfollowUser: {
            id: user.id,
            __typename: 'User',
            followedByCurrentUser: false,
            username: user.username,
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
          // this.setState({ errors });
        })
    }
  })
})

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
  }),
  followUser,
  unfollowUser,
)(UserInformation)


