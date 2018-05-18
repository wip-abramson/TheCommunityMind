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
      linkTypeSelected: null,
      questionText: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.selectLinkType = this.selectLinkType.bind(this);
  }

  // TODO not happy with how this is achieved. Should load links from BE
  linkTypes = [{id: 1, linkType: "Super Questions"}, {id: 2, linkType: "Sub Questions"}, {id: 3, linkType: "Unrelated Question"}];

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isInput !== this.props.isInput && this.props.isInput === false) {
      this.setState({
        topics: [],
        linkTypeSelected: null,
        questionText: ""
      })
    }
  }

  selectLinkType(linkTypeId) {
    if (this.props.isInput) {
      this.updateQuestionInputLinkType(linkTypeId);
    }
    else {
      // TODO load links in view to navigate through
    }
  }

  updateQuestionInputLinkType(linkTypeId) {
    if (this.state.linkTypeSelected && this.state.linkTypeSelected.id === linkTypeId) {
      this.setState({
        linkTypeSelected: null
      })
    }
    else {
      let linkIds = this.linkTypes.map(type => type.id);
      this.setState({
        linkTypeSelected: this.linkTypes[linkIds.indexOf(linkTypeId)]
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
      .then(response => {
        if (this.props.isInput && response.data.findOrCreateTopic) {
          console.log("adding topics", response.data.findOrCreateTopic);
          this.setState({
            topics: [...this.state.topics, response.data.findOrCreateTopic]
          })
        }
      })
      .catch(error => {
        // TODO handle error with notifications
        console.log(error)
      })

  }


  render() {
    // TODO hasMoreTopics needs to be more defined then just not input
    return (
      <div className={styles.questionBox}>
        <TopicsBar
          topics={this.props.isInput ? this.state.topics : topics}
          hasMoreTopics={!this.props.isInput}
          onAddTopic={this.handleAddTopic}
          isInput={this.props.isInput}
        />
        {this.props.isInput ?
          <QuestionInput value={this.state.questionText} onInputChange={this.handleTextChange}/> :
          <QuestionText questionText="Do all questions need answers?"/>}
        <QuestionLinksBar
          selectedLinkType={this.state.linkTypeSelected}
          selectLinkType={this.selectLinkType}
          isInput={this.props.isInput}/>
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