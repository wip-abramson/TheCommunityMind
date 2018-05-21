/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import TopicsBar from '../TopicsBar/TopicsBar';
import QuestionText from '../QuestionText/QuestionText';
import QuestionLinksBar from '../QuestionLinksBar/QuestionLinksBar';
import QuestionInput from '../QuestionInput/QuestionInput';



class QuestionBox extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    // TODO hasMoreTopics needs to be more defined then just not input
    return (
      <div className={styles.questionBox}>
        <TopicsBar
          topicLinks={this.props.question.linksToTopics.edges.map(edge => edge.node)}
          hasMoreTopics={this.props.question.linksToTopics.pageInfo.hasNextPage}// this.props.question.linksToTopics.edges.pageInfo.hasNextPage}
          onAddTopic={this.props.onAddTopic}
          isInput={this.props.isInput}
          questionId={this.props.question.id}
          onDeleteTopic={this.props.onDeleteTopic}
        />
        {this.props.isInput ?
          <QuestionInput currentInput={this.props.question.questionText} onInputChange={this.props.onQuestionChange}/> :
          <QuestionText questionText={this.props.question.questionText} />}
        <QuestionLinksBar
          superQuestionsCount={this.props.question.superQuestionsCount}
          subQuestionsCount={this.props.question.subQuestionsCount}
          relatedQuestionsCount={this.props.question.relatedQuestionsCount}
          currentSelectedLinkType={this.props.question.linkTypeSelected}
          onSelectLinkType={this.props.onSelectQuestionLink}
          isInput={this.props.isInput}/>
      </div>
    )
  }
}

// TODO make question required ans use to get topics etc

QuestionBox.propTypes = {
  isInput: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string,
    questionText: PropTypes.string.isRequired,
    linksToTopics: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }).isRequired,
    linkTypeSelected: PropTypes.shape({
      id: PropTypes.string.isRequired,
      linkType: PropTypes.string.isRequired
    })
  }).isRequired,
  onQuestionChange: PropTypes.func,
  onSelectQuestionLink: PropTypes.func.isRequired,
  onAddTopic: PropTypes.func,
  onDeleteTopic: PropTypes.func
};

export default QuestionBox;