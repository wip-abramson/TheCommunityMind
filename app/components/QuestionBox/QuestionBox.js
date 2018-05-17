/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from "react-apollo";

import styles from './styles.css';

import TopicsBar from '../TopicsBar/TopicsBar';
import QuestionText from '../QuestionText/QuestionText';
import QuestionLinksBar from '../QuestionLinksBar/QuestionLinksBar';
import QuestionInput from '../QuestionInput/QuestionInput';

import FIND_OR_CREATE_TOPIC from '../../graphql/mutations/findOrCreateTopic.mutation';

const topics = [{ id: "12", name: "Questioning" }, { id: "13", name: "Answers" }, {
  id: "11",
  name: "Meaning"
}, { id: "1", name: "Ideas" }];

const findOrCreateTopic = graphql(FIND_OR_CREATE_TOPIC, {
  props: ({ ownProps, mutate }) => ({
    findOrCreateTopic: (name) => {
      console.log("FINDING THREAD", name)
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
        const errors = res.graphQLErrors.map((error) => {
          // What about other errors?
          console.log(error.message)
          throw new Error('Unable to add Topic')
        });
        return errors
        // this.setState({ errors });
      })
    }
  })
});

class QuestionBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      linkType: {},
      questionText: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isInput !== this.props.isInput && this.props.isInput === false) {
      this.setState({
        topics: [],
        linkType: {},
        questionText: ""
      })
    }
  }

  handleTextChange(evt) {
    this.setState({
      questionText: evt.target.value
    })
  }

  handleAddTopic(topic) {
    this.props.findOrCreateTopic(topic)
      .then(createdTopic => {
        console.log(createdTopic)
        if (this.props.isInput && createdTopic) {
          this.setState({
            topics: [createdTopic, ...this.state.topics]
          })
        }
      })
      .catch(error => {
        // TODO handle error with notifications
        console.log(error)
      })

  }

  render() {
    return (
      <div className={styles.questionBox}>
        <TopicsBar
          topics={this.props.isInput ? this.state.topics : topics}
          hasMoreTopics={!this.props.isInput}
          onAddTopic={this.handleAddTopic}

        />
        {this.props.isInput ?
          <QuestionInput value={this.state.questionText} onInputChange={this.handleTextChange}/> :
          <QuestionText questionText="Do all questions need answers?"/>}
        <QuestionLinksBar isInput={this.props.isInput}/>
      </div>
    )
  }
}

// TODO make question required ans use to get topics etc

QuestionBox.propTypes = {
  isInput: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
  }),
  findOrCreateTopic: PropTypes.func.isRequired,
};

export default compose(
  findOrCreateTopic
)(QuestionBox);