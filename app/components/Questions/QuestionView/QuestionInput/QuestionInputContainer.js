/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import { compose, graphql } from "react-apollo";

import FIND_OR_CREATE_THREAD from '../../../../graphql/mutations/findOrCreateThread.mutation';

import QuestionInput from './QuestionInput';

const findOrCreateTag = graphql(FIND_OR_CREATE_THREAD, {
  props: ({ ownProps, mutate }) => ({
    findOrCreateThread: (name) => {
      console.log("FINDING THREAD", name)
      return mutate({
        variables: { name: name },
        optimisticResponse: {
          __typename: 'Mutation',
          findOrCreateThread: {
            __typename: 'Tag',
            id: "-1", // fake id
            name: name

          },

        },

      }).catch(res => {
        // catches any error returned from mutation request
        const errors = res.graphQLErrors.map((error) => {
          // What about other errors?
          console.log(error.message)
          return error;
        });
        return errors
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
      questionThreads: [],
    }

    this.handleAddThread = this.handleAddThread.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveThread = this.handleRemoveThread.bind(this);
  }

  handleSubmit() {
    console.log("SUBMIT", this.state.questionText)
    var tagIds = this.state.questionThreads.map(questionThread => { console.log(questionThread.id); return questionThread.id});


    this.props.createQuestion(this.state.questionText, tagIds).then(res => {
      this.setState({questionText: "", questionThreads: []})

    })


  }

  handleTextChange(e) {
    this.setState({
      questionText: e.target.value
    })
  }

  handleAddThread(event) {
    if (event.keyCode === 13) {
      var threadName = event.target.value.trim();
      if (threadName.length !== 0) {
        this.props.findOrCreateThread(threadName)
          .then(res => {
            this.setState(previousState => ({
              questionThreads: [...previousState.questionThreads, res.data.findOrCreateTag]
            }));
          })
          .catch(error => {
            console.log(error.message)
          });
      }


      event.target.value = "";
    }
  }

  handleRemoveThread(thread) {
    var newThreadList = [];
    this.state.questionThreads.map((questionThread) => {
      if (questionThread.id !== thread.id) {
        newThreadList.push(questionThread);
      }
    });

    this.setState({ questionThreads: newThreadList })
  }

  render() {
    return (
      <QuestionInput
        questionText={this.state.questionText}
        questionThreads={this.state.questionThreads}
        placeholder={this.props.placeholder}
        onKeyPress={this.handleAddThread}
        onTextChange={this.handleTextChange}
        onSubmit={this.handleSubmit}
        removeThread={this.handleRemoveThread}
      />
    )
  }
}

export default compose(
  findOrCreateTag
)(QuestionInputContainer);