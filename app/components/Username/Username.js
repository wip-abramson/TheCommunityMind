/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';

import styles from './styles.css';

import Count from '../generic/Count/Count';
import Dropdown from '../generic/Dropdown/Dropdown';
import ViewProfile from './MenuItems/ViewProfile';
import TipUser from './MenuItems/TipUser';
import FollowUser from './MenuItems/FollowUser';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import FOLLOW_USER_MUTATION from '../../graphql/mutations/followUser.mutation'
import UNFOLLOW_USER_MUTATION from '../../graphql/mutations/unfollowUser.mutation';
import TIP_USER_MUTATION from '../../graphql/mutations/tipUser.mutation';

const mapDispatchToProps = function (dispatch) {
  return {
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    },
  }
};

const followUser = graphql(FOLLOW_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    followUser: (userId) => {
      return mutate({
        variables: { userId: userId },
        optimisticResponse: {
          __typename: 'Mutation',
          followUser: {
            id: userId,
            __typename: 'User',
            followedByCurrentUser: true,
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
        })
    }
  })
});

const unfollowUser = graphql(UNFOLLOW_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unfollowUser: (userId) => {

      return mutate({
        variables: { userId: userId},
        optimisticResponse: {
          __typename: 'Mutation',
          unfollowUser: {
            id: userId,
            __typename: 'User',
            followedByCurrentUser: false,
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
        })
    }
  })
});

const tipUser = graphql(TIP_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    tipUser: (userId) => {

      //TODO potentially think about optimistic response of logged in user with updated balance
      return mutate({
        variables: { userId: userId},
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   tipUser: {
        //     id: userId,
        //
        //     __typename: 'User',
        //     followedByCurrentUser: false,
        //   }
        // },
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
        })
    }
  })
});


const Username = ({user, followUser, unfollowUser, tipUser}) => {
  console.log(user);
  return (
    <div className={styles.username}>
      <Dropdown title={user.username} fontSize={22} id={user.id}>
        <FollowUser
          canFollow={!user.followedByCurrentUser}
          followUser={followUser}
          unfollowUser={unfollowUser}
          userId={user.id}/>
        <TipUser
          userId={user.id}
          tipUser={tipUser}/>
        <ViewProfile userId={user.id}/>
      </Dropdown>
      <Count amount={user.questionsAskedCount}/>
    </div>
  )
}


Username.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    followedByCurrentUser: PropTypes.bool.isRequired,
  }).isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  tipUser,
  followUser,
  unfollowUser,
)(Username)