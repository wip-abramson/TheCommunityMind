/**
 * Created by will on 18/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from "react-apollo";
import { browserHistory } from 'react-router'

import styles from './styles.css';

import UserInteractionsBar from '../UserInteractionsBar/UserInteractionsBar';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import QuestionBox from '../QuestionBox/QuestionBox'
import Modal from '../generic/Modal/Modal';
import Loading from '../generic/Loading/Loading';

import FIND_OR_CREATE_TOPIC from '../../graphql/mutations/findOrCreateTopic.mutation';
import CREATE_QUESTION_MUTATION from '../../graphql/mutations/createQuestion.mutation';

const createQuestion = graphql(CREATE_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createQuestion: (questionText, topicIds, linkType, questioningId) => {
      return mutate({

        variables: { questionText, topicIds, linkType, questioningId },

      }).catch(res => {

        res.graphQLErrors.map((error) => {
          console.log(error.message)
          //TODO add notifications
          if (error.message === "Unauthorized") {
            // ownProps.unAuthorized();
          }
          return error;
        });
      })
    }

  })
});

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
  linkTypes = [{ id: '1', linkType: "Super Question" }, {
    id: '2',
    linkType: "Sub Question"
  }, { id: '3', linkType: "Related Question" }];

  constructor(props) {
    super(props);
    // TODO possible make state mirror a question object from graphql response
    this.state = {
      question: {
        linksToTopics: this.props.currentTopicLinks,
        linkTypeSelected: null,
        questionText: "",
      }
    };

    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
    this.handleUpdateQuestionLinkTypeSelected = this.handleUpdateQuestionLinkTypeSelected.bind(this);
    this.handleDeleteTopic = this.handleDeleteTopic.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
  }

  handleQuestionTextChange(updatedQuestionText) {
    this.setState({
      question: {
        ...this.state.question,
        questionText: updatedQuestionText
      },
      showLoadingModal: false,

    })
  }

  handleUpdateQuestionLinkTypeSelected(linkType) {
    if (this.state.question.linkTypeSelected && this.state.question.linkTypeSelected.id === linkType.id) {
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
          linkTypeSelected: this.linkTypes[linkIds.indexOf(linkType.id)]
        }
      })
    }
  }

  handleAddTopic(topic) {
    if (!isEmpty(topic)) {
      this.props.findOrCreateTopic(topic.trim().toLowerCase())
        .then(response => {
          if (response.data.findOrCreateTopic) {
            this.setState({
              question: {
                ...this.state.question,
                linksToTopics: {
                  edges: [...this.state.question.linksToTopics.edges, { node: { topic: response.data.findOrCreateTopic } }],
                  pageInfo: this.state.question.linksToTopics.pageInfo

                }
              }
            })
          }
        })
        .catch(error => {
          // TODO handle error with notifications
          console.log(error)
        })
    }
    else {
      this.props.inputFieldEmptyErrorNotification("No topic entered! You must enter a topic first");
    }

  }

  handleDeleteTopic(topicId) {
    let topicIds = this.state.question.linksToTopics.edges.map(edge => edge.node.topic.id);
    let indexToRemove = topicIds.indexOf(topicId);

    const newEdges = [];
    for (let i = 0; i < this.state.question.linksToTopics.edges.length; i++) {
      if (i !== indexToRemove) {
        newEdges.push(this.state.question.linksToTopics.edges[i]);
      }
    }

    this.setState({
      question: {
        ...this.state.question,
        linksToTopics: {
          edges: newEdges,
          pageInfo: this.state.question.linksToTopics.pageInfo

        }
      }
    })
  }

  handleSubmitQuestion() {
    if (!isEmpty(this.state.question.questionText)) {
      this.setState({showLoadingModal: true});
      const questionText = this.state.question.questionText.trim().toLowerCase();
      const linkType = this.state.question.linkTypeSelected ? this.state.question.linkTypeSelected.linkType : null;
      const topicIds = this.state.question.linksToTopics.edges.map(edge => edge.node.topic.id);

      this.props.createQuestion(questionText, topicIds, linkType, this.props.questioningId).then(response => {
        this.setState({
          question: {
            linksToTopics: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
              }
            },
            linkTypeSelected: null,
            questionText: "",
          },
          showLoadingModal: false
        });
        browserHistory.push({
          pathname: "/question",
          query: { questionId: response.data.createQuestion.id }
        })
      })
        .catch(error => {
          // TODO handle error with notification
          console.log("Error", error);
        })
    }
    else {
      this.props.inputFieldEmptyErrorNotification("Question empty! Please enter a question first");
    }
  }



  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar focusType="Question Input" isInput={this.isInput}/>
        <QuestionBox
          previousQuestion={this.props.previousQuestion}
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}
          onQuestionChange={this.handleQuestionTextChange}
          question={this.state.question}
          onSelectQuestionLink={this.handleUpdateQuestionLinkTypeSelected}
          linkTypes={this.linkTypes}
          onDeleteTopic={this.handleDeleteTopic}
          onAddTopic={this.handleAddTopic}
        />
        <UserInteractionsBar
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}
          toggleIsInput={this.props.toggleIsInput}/>
        <Modal show={this.state.showLoadingModal}>
          <Loading loadingText="Submitting Inspiration to The Community Mind."/>
        </Modal>
      </div>

    )
  }
}

function isEmpty(str) {
  return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
}

QuestionInputFocus.propTypes = {
  previousQuestion: PropTypes.string.isRequired,
  toggleIsInput: PropTypes.func.isRequired,
  findOrCreateTopic: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  questioningId: PropTypes.string.isRequired,
  inputFieldEmptyErrorNotification: PropTypes.func.isRequired
};

export default compose(
  findOrCreateTopic,
  createQuestion
)(QuestionInputFocus);