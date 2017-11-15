/**
 * Created by will on 13/11/17.
 */
import React from 'react'
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";


import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../../../notifications/error.notifications';


import STAR_QUESTION_MUTATION from '../../../../graphql/mutations/starQuestion.mutation';
import UNSTAR_QUESTION_MUTATION from '../../../../graphql/mutations/unstarQuestion.mutation';
import WATCH_QUESTION_MUTATION from '../../../../graphql/mutations/watchQuestion.mutation';
import UNWATCH_QUESTION_MUTATION from '../../../../graphql/mutations/unwatchQuestion.mutation';

import EDIT_QUESTION_MUTATION from '../../../../graphql/mutations/editQuestion.mutation';

import Question from './Question';

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
    }
  }
}

const starQuestion = graphql(STAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    starQuestion: ({ question }) => {
      console.log("Star Question", question)
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          starQuestion: {
            id: question.id,
            __typename: 'Question',
            stars: question.stars + 1,
            question: question.question,
            staredByCurrentUser: true
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

const unstarQuestion = graphql(UNSTAR_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unstarQuestion: ({ question }) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          unstarQuestion: {
            id: question.id,
            __typename: 'Question',
            stars: question.stars - 1,
            question: question.question,
            staredByCurrentUser: false
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
    watchQuestion: ({ question }) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          watchQuestion: {
            id: question.id,
            __typename: 'Question',
            question: question.question,
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
    unwatchQuestion: ({ question }) => {
      return mutate({
        variables: { id: question.id },
        optimisticResponse: {
          __typename: 'Mutation',
          unwatchQuestion: {
            id: question.id,
            __typename: 'Question',
            question: question.question,
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

const editQuestion = graphql(EDIT_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    editQuestion: ( id, newQuestion) => {
      console.log(id, newQuestion, "Edit")
      return mutate({
        variables: { id: id, question: newQuestion },

      })
        .catch(res => {
          // unlikley to be unauthorized as never show edit button to unauthorized users
          ownProps.unAuthorized();

          // catches any error returned from mutation request
          // const errors = res.graphQLErrors.map((error) => {
          //   console.log("Failed")
          //   console.log(error.message)
          //   return error;
          // });
          // return errors
          // this.setState({ errors });
        })
    }
  })

})

let container = React.createClass({

  getInitialState() {
    return {
      editable: false
    }

    this.editQuestion = this.editQuestion.bind(this);
    this.toggleEditable = this.toggleEditable.bind(this);

  },

  editQuestion(question, id) {
    this.setState({ editable: false })
    console.log(question, id)
    console.log(id)
    this.props.editQuestion(id, question);
  },

  toggleEditable() {
    this.setState({ editable: !this.state.editable })
  },

  render() {
    return (
      <Question
        onSelectQuestion={this.props.onSelectQuestion}
        questionType={this.props.questionType}
        starQuestion={this.props.starQuestion}
        unstarQuestion={this.props.unstarQuestion}
        editable={this.state.editable}
        editQuestion={this.editQuestion}
        toggleEditable={this.toggleEditable}
        currentUser={this.props.currentUser}
        link={this.props.link}
        watchQuestion={this.props.watchQuestion}
        unwatchQuestion={this.props.unwatchQuestion}
      />
    )
  }
})

const QuestionContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  starQuestion,
  unstarQuestion,
  editQuestion,
  watchQuestion,
  unwatchQuestion
)(container);

export default QuestionContainer;