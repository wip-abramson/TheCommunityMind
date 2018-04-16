/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { showQuestionPopup } from '../../actions/QuestionPopup';

import Question from './Question';

import STAR_QUESTION_MUTATION from '../../graphql/mutations/starQuestion.mutation';
import UNSTAR_QUESTION_MUTATION from '../../graphql/mutations/unstarQuestion.mutation';
import WATCH_QUESTION_MUTATION from '../../graphql/mutations/watchQuestion.mutation';
import UNWATCH_QUESTION_MUTATION from '../../graphql/mutations/unwatchQuestion.mutation';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

const mapStateToProps = function (state) {
  return {
    currentUser: state.auth.currentUser
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    },
    showQuestionPopup: (question) => {
      dispatch(showQuestionPopup(question));
    },
  }
}


const starQuestion = graphql(STAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    starQuestion: (question) => {
      console.log("StarIcon Question", question)
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          starQuestion: {
            __typename: 'Question',
            id: question.id,
            stars: question.stars + 1,
            questionText: question.questionText,
            starredByCurrentUser: true,
            watchedByCurrentUser: question.watchedByCurrentUser,
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
    unstarQuestion: (question) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          unstarQuestion: {
            id: question.id,
            __typename: 'Question',
            stars: question.stars - 1,
            questionText: question.questionText,
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

const watchQuestion = graphql(WATCH_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    watchQuestion: (question) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          watchQuestion: {
            id: question.id,
            __typename: 'Question',
            questionText: question.questionText,
            watchedByCurrentUser: true,
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

const unwatchQuestion = graphql(UNWATCH_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unwatchQuestion: (question) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          unwatchQuestion: {
            id: question.id,
            __typename: 'Question',
            questionText: question.questionText,
            watchedByCurrentUser: false,
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
})



class Container extends React.Component {
  constructor(props) {
    super(props);

    this.editQuestion = this.editQuestion.bind(this);
  }


  editQuestion() {
    this.props.showQuestionPopup(this.props.question);
  }

  deleteQuestion() {
    // TODO
    console.log("DELETE");
  }

  render() {
    return (
      <Question
        question={this.props.question}
        starQuestion={this.props.starQuestion}
        unstarQuestion={this.props.unstarQuestion}
        editQuestion={this.editQuestion}
        askQuestion={this.props.showQuestionPopup}
        deleteQuestion={this.deleteQuestion}
        watchQuestion={this.props.watchQuestion}
        unwatchQuestion={this.props.unwatchQuestion}

      />
    )
  }
}

const QuestionContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  starQuestion,
  unstarQuestion,
  watchQuestion,
  unwatchQuestion
)(Container);

export default QuestionContainer;