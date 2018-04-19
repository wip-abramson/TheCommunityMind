/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import { compose, graphql } from "react-apollo";

import QuestionInput from './QuestionInput';
import CREATE_QUESTION_MUTATION from "../../../graphql/mutations/createQuestion.mutation";
import EDIT_QUESTION_MUTATION from '../../../graphql/mutations/editQuestion.mutation';
import QUESTIONS_QUERY from "../../../graphql/querys/questions.query";


const createQuestion = graphql(CREATE_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: ( questionText, parentId) => {
      return mutate({

        variables: { questionText, parentId },
        optimisticResponse: {
          __typename: 'Mutation',
          createQuestion: {
            __typename: 'Question',
            id: "-1",
            questionText: questionText,
            stars: 0,
            ownedByCurrentUser: true,
            starredByCurrentUser: false,
            watchedByCurrentUser: false,
            createdAt: new Date().toISOString(), // the time is now!
            owner: {
              __typename: 'User',
              id: "-1", // still faking the user
              username: 'Justyn.Kautzer' // still faking the user
            },
          },
        },
        update: (proxy, { data: { createQuestion } }) => {
          // Read the data from our cache for this query.
          const query = {
            query: QUESTIONS_QUERY,
            variables: {
              first: 10,
              // after: null,
              // before: null,
              // last: null
            }
          }
          const data = proxy.readQuery(query);
          // Add why from the mutation to the beginning.

          const questionEdge = {
            __typename: "QuestionEdge",
            node: createQuestion,
            cursor: Buffer.from(createQuestion.createdAt.toString()).toString('base64')
          };

          data.questions.edges.unshift(questionEdge);
          // Write our data back to the cache.
          query.data = data;
          proxy.writeQuery(query);
        },
      }).catch(res => {
        // catches any error returned from mutation request
        // ownProps.unAuthorized();

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

const editQuestion = graphql(EDIT_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    editQuestion: ( id, newQuestion) => {
      console.log(id, newQuestion, "Edit")
      return mutate({
        variables: { id: id, questionText: newQuestion },
        optimisticResponse: {
          __typename: 'Mutation',
          editQuestion: {
            id: id,
            __typename: 'Question',
            questionText: newQuestion,
            watchedByCurrentUser: false,
          }
        },
      })
        .catch(res => {
          // unlikley to be unauthorized as never show edit button to unauthorized users
          // ownProps.unAuthorized();

          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log("Failed")
            console.log(error.message)
            return error;
          });
          // return errors
          // this.setState({ errors });
        })
    }
  })

})




class QuestionInputContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionText: "",
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO On Component Did Render should populate the questionText field if question exists ie for edit

  handleSubmit() {
    console.log("SUBMIT", this.state.questionText)
    console.log("IsEdit", !!this.props.question)
    console.log("Parent Question ID", this.props.parentId);
    //TODO handle threads

    if (this.props.parentId) {
      this.props.createQuestion(this.state.questionText, this.props.parentId).then(res => {
      });

    }
    else if (this.props.question) {
      this.props.editQuestion(this.props.question.id, this.state.questionText);
    }
    else {
      this.props.createQuestion(this.state.questionText, null).then(res => {

      });
    }
    this.setState({
      questionText: "",
    });
    this.props.hideQuestionPopup();

  }


  handleTextChange(e) {
    this.setState({
      questionText: e.target.value
    })
  }


  render() {
    return (
      <QuestionInput
        questionText={this.state.questionText}
        placeholder="Ask your beautiful question ..."
        onTextChange={this.handleTextChange}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default compose(
  createQuestion,
  editQuestion
)(QuestionInputContainer);