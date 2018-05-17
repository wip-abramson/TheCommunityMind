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

    this.state = {
      topics: [],
      linkType: {},
      questionText: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isInput !== this.props.isInput && this.props.isInput == false) {
      this.setState({
        topics: [],
        linkType: {},
        questionText: ""
      })
    }
  }

  handleTextChange(evt) {
    console.log(evt.target.value)
    this.setState({
      questionText: evt.target.value
    })
  }

  render() {
    return (
      <div className={styles.questionBox}>
        <TopicsBar topics={this.props.isInput ? this.state.topics : topics}
                   hasMoreTopics={!this.props.isInput}/>
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
  })
};

export default QuestionBox;