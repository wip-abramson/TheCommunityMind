/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import UserInteractionsBar from '../UserInteractionsBar/UserInteractionsBar';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import QuestionBox from '../QuestionBox/QuestionBox'

import FaRightArrow from 'react-icons/lib/fa/arrow-right';
import FaLeftArrow from 'react-icons/lib/fa/arrow-left';

// TODO link up to backend and fetch question
// TODO implement left and right arrow nav
class QuestionFocus extends React.Component {

  isInput = false;

  constructor(props) {
    super(props);
    this.handleSelectLinkType = this.handleSelectLinkType.bind(this);
  }

  handleSelectLinkType(linkType) {
    console.log("Selecting", linkType);
  }

  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar isInput={this.isInput}
                             user={this.props.question.owner}
                             timeCreated={this.props.question.createdAt}
                             focusType="Question Focus"/>
        <FaLeftArrow size={30} className={styles.leftNav} onClick={this.props.onPreviousQuestion}/>
        <QuestionBox
          onSelectQuestionLink={this.handleSelectLinkType}
          question={this.props.question}
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}/>
        <FaRightArrow size={30} className={styles.rightNav} onClick={this.props.onNextQuestion}/>
        <UserInteractionsBar isInput={this.isInput}
                             stars={this.props.question.stars}
                             starredByCurrentUser={this.props.question.starredByCurrentUser}
                             ponderCount={this.props.question.ponderCount}
                             ponderedByCurrentUser={this.props.question.ponderedByCurrentUser}
                             questionId={this.props.question.id}
                             toggleIsInput={this.props.toggleIsInput}/>
      </div>

    )
  }
}

QuestionFocus.propTypes = {
  question: PropTypes.shape({}).isRequired,
  toggleIsInput: PropTypes.func.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  onPreviousQuestion: PropTypes.func.isRequired
};

export default QuestionFocus;
