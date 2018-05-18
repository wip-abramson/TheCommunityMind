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


const topics = [{ id: "12", name: "Questioning" }, { id: "13", name: "Answers" }, {
  id: "11",
  name: "Meaning"
}, { id: "1", name: "Ideas" }];



class QuestionBox extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    // TODO hasMoreTopics needs to be more defined then just not input
    return (
      <div className={styles.questionBox}>
        <TopicsBar
          topics={this.props.question.topics}
          hasMoreTopics={!this.props.isInput}
          onAddTopic={this.props.onAddTopic}
          isInput={this.props.isInput}
        />
        {this.props.isInput ?
          <QuestionInput currentInput={this.props.question.questionText} onInputChange={this.props.onQuestionChange}/> :
          <QuestionText questionText="Do all questions need answers?"/>}
        <QuestionLinksBar
          selectedLinkType={this.props.question.linkTypeSelected}
          selectLinkType={this.props.onSelectQuestionLink}
          isInput={this.props.isInput}/>
      </div>
    )
  }
}

// TODO make question required ans use to get topics etc

QuestionBox.propTypes = {
  isInput: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string,
    questionText: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    linkTypeSelected: PropTypes.shape({
      id: PropTypes.string.isRequired,
      linkType: PropTypes.string.isRequired
    })
  }).isRequired,
  onQuestionChange: PropTypes.func,
  onSelectQuestionLink: PropTypes.func.isRequired,
  onAddTopic: PropTypes.func.isRequired
};

export default QuestionBox;