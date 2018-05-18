/**
 * Created by will on 18/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from "react-apollo";


import styles from './styles.css';

import UserInteractionsBar from '../UserInteractionsBar/UserInteractionsBar';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import QuestionBox from '../QuestionBox/QuestionBox'

import FIND_OR_CREATE_TOPIC from '../../graphql/mutations/findOrCreateTopic.mutation';


const findOrCreateTopic = graphql(FIND_OR_CREATE_TOPIC, {
  props: ({ ownProps, mutate }) => ({
    findOrCreateTopic: (name) => {
      return mutate({
        variables: { name: name },
        optimisticResponse: {
          __typename: 'Mutation',
          findOrCreateTopic: {
            __typename: 'Topic',
            id: "-1", // fake id
            name: name

          },

        },

      }).catch(res => {
        // catches any error returned from mutation request
        res.graphQLErrors.map((error) => {
          // What about other errors?
          throw new Error('Unable to add Topic')
        });
      })
    }
  })
});

class QuestionInputFocus extends React.Component {

  isInput = true;
  // TODO not happy with how this is achieved. Should load links from BE
  linkTypes = [{id: 1, linkType: "Super Questions"}, {id: 2, linkType: "Sub Questions"}, {id: 3, linkType: "Unrelated Question"}];

  constructor(props) {
    super(props);
    // TODO possible make state mirror a question object from graphql response
    this.state = {
      question: {
        topics: [],
        linkTypeSelected: null,
        questionText: "",
      }
    };

    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    this.handleUpdateQuestionLinkTypeSelected = this.handleUpdateQuestionLinkTypeSelected.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
  }

  handleQuestionTextChange(updatedQuestionText) {
    this.setState({
      question: {
        ...this.state.question,
        questionText: updatedQuestionText
      }

    })
  }

  handleUpdateQuestionLinkTypeSelected(linkTypeId) {
    if (this.state.question.linkTypeSelected && this.state.question.linkTypeSelected.id === linkTypeId) {
      this.setState({
        question: {
          ...this.state.question,
          linkTypeSelected: null
        }
      })
    }
    else {
      let linkIds = this.linkTypes.map(type => type.id);
      this.setState({
        question: {
          ...this.state.question,
          linkTypeSelected: this.linkTypes[linkIds.indexOf(linkTypeId)]
        }
      })
    }
  }

  handleAddTopic(topic) {
    this.props.findOrCreateTopic(topic)
      .then(response => {
        if (response.data.findOrCreateTopic) {
          console.log("adding topics", response.data.findOrCreateTopic);
          this.setState({
            question: {
              ...this.state.question,
              topics: [...this.state.question.topics, response.data.findOrCreateTopic]
            }
          })
        }
      })
      .catch(error => {
        // TODO handle error with notifications
        console.log(error)
      })

  }

  handleSubmitQuestion(data) {
    console.log(data);
  }

  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar focusType="Question Input" isInput={this.isInput} user={{ id: "1", username: "Will" }}/>
        <QuestionBox
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}
          onQuestionChange={this.handleQuestionTextChange}
          question={this.state.question}
          onSelectQuestionLink={this.handleUpdateQuestionLinkTypeSelected}
          linkTypes={this.linkTypes}
          onAddTopic={this.handleAddTopic}
        />
        <UserInteractionsBar isInput={this.isInput} questionId={11} toggleIsInput={this.props.toggleIsInput}/>
      </div>

    )
  }
}

QuestionInputFocus.propTypes = {
  toggleIsInput: PropTypes.func.isRequired,
  questioningId: PropTypes.string.isRequired,
  findOrCreateTopic: PropTypes.func.isRequired
};

export default compose(
  findOrCreateTopic
)(QuestionInputFocus);