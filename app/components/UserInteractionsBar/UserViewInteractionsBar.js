/**
 * Created by will on 19/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';

import styles from './styles.css';

import StarIcon from './icons/StarIcon';
import PonderIcon from './icons/PonderIcon';
import AskQuestionIcon from './icons/AskQuestionIcon';
import AddLinkIcon from './icons/AddLinkIcon';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import STAR_QUESTION_MUTATION from '../../graphql/mutations/starQuestion.mutation';
import UNSTAR_QUESTION_MUTATION from '../../graphql/mutations/unstarQuestion.mutation';
import PONDER_QUESTION_MUTATION from '../../graphql/mutations/ponderQuestion.mutation';
import FORGET_QUESTION_MUTATION from '../../graphql/mutations/forgetQuestion.mutation';

const mapDispatchToProps = function (dispatch) {
  return {
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    },
  }
};

const starQuestion = graphql(STAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    starQuestion: () => {
      return mutate({
        variables: { id: ownProps.questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          starQuestion: {
            __typename: 'Question',
            id: ownProps.questionId,
            stars: ownProps.stars + 1,
            starredByCurrentUser: true,
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
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

const unstarQuestion = graphql(UNSTAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unstarQuestion: () => {
      return mutate({
        variables: { id: ownProps.questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          unstarQuestion: {
            id: ownProps.questionId,
            __typename: 'Question',
            stars: ownProps.stars - 1,
            starredByCurrentUser: false
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

const ponderQuestion = graphql(PONDER_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    ponderQuestion: () => {
      return mutate({
        variables: { id: ownProps.questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          ponderQuestion: {
            id: ownProps.questionId,
            __typename: 'Question',
            ponderedByCurrentUser: true,
            ponderCount: ownProps.ponderCount + 1
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

const forgetQuestion = graphql(FORGET_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    forgetQuestion: () => {
      return mutate({
        variables: { id: ownProps.questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          unponderQuestion: {
            id: ownProps.questionId,
            __typename: 'Question',
            ponderedByCurrentUser: false,
            ponderCount: ownProps.ponderCount - 1
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


// TODO this should be in its own component!!!
const View = ({stars, starredByCurrentUser, starQuestion, unstarQuestion, ponderCount, ponderedByCurrentUser, ponderQuestion, forgetQuestion, toggleIsInput}) =>
  <div className={styles.bottomBar}>
    <StarIcon
      starCount={stars}
      isStarred={starredByCurrentUser}
      starQuestion={starQuestion}
      unstarQuestion={unstarQuestion}
    />
    <PonderIcon
      ponderCount={ponderCount}
      isPondering={ponderedByCurrentUser}
      ponderQuestion={ponderQuestion}
      forgetAboutQuestion={forgetQuestion}
    />
    <div className={styles.spaceHolder}/>
    {// TODO Implement adding links
      /*<AddLinkIcon addLinkToQuestion={() => console.log("Add Link")}/>*/}
    <AskQuestionIcon changeToInputView={toggleIsInput}/>
  </div>;

View.propTypes = {
  stars: PropTypes.number.isRequired,
  starredByCurrentUser: PropTypes.bool.isRequired,
  ponderCount: PropTypes.number.isRequired,
  ponderedByCurrentUser: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  ponderQuestion: PropTypes.func.isRequired,
  forgetQuestion: PropTypes.func.isRequired
};

const UserViewInteractionsBar = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  starQuestion,
  unstarQuestion,
  ponderQuestion,
  forgetQuestion
)(View);

UserViewInteractionsBar.propTypes = {
  stars: PropTypes.number.isRequired,
  starredByCurrentUser: PropTypes.bool.isRequired,
  ponderCount: PropTypes.number.isRequired,
  ponderedByCurrentUser: PropTypes.bool.isRequired,
};

export default UserViewInteractionsBar;