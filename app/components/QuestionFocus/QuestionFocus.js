/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import ReactTooltip from 'react-tooltip';
import FaRightArrow from 'react-icons/lib/fa/arrow-right';
import FaLeftArrow from 'react-icons/lib/fa/arrow-left';

import styles from './styles.css';

import UserInteractionsBar from '../UserInteractionsBar/UserInteractionsBar';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import QuestionBox from '../QuestionBox/QuestionBox'
import FocusOutline from '../generic/FocusOutline/FocusOutline';
import FocalCenterOutline from '../generic/FocalCenterOutline/FocalCenterOutline';


import Notifications from 'react-notification-system-redux';
import { noQuestionLinksError } from '../../notifications/error.notifications';

const mapDispatchToProps = function (dispatch) {
  return {
    noLinksToView: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.info(noQuestionLinksError))
    },
  }
};

// TODO link up to backend and fetch question
// TODO implement left and right arrow nav
class QuestionFocus extends React.Component {

  isInput = false;

  constructor(props) {
    super(props);
    this.handleSelectLinkType = this.handleSelectLinkType.bind(this);
  }

  handleSelectLinkType(linkType) {
    if(linkType.amount === 0) {
      this.props.noLinksToView();
    }
    else {
      browserHistory.push({ pathname: "/question/links", query: { questionId: this.props.question.id, linkType: linkType.linkType }})
    }
  }

  render() {
    return (
      <FocusOutline
        canNavigate={true}
        navLeftText="Previous Question"
        navRightText={this.props.navRightText}
        navigateLeft={this.props.onPreviousQuestion}
        navigateRight={this.props.onNextQuestion}>
        <QuestionUsernameBar isInput={this.isInput}
                             user={this.props.question.owner}
                             timeCreated={this.props.question.createdAt}
                             focusType="Question Focus"/>
        <FocalCenterOutline>
          <QuestionBox
            updateQuery={this.props.updateQuery}
            refetchQuestion={this.props.refetchQuestion}
            onSelectQuestionLink={this.handleSelectLinkType}
            question={this.props.question}
            isInput={this.isInput}
            onSubmitQuestion={this.handleSubmitQuestion}/>
        </FocalCenterOutline>

        <UserInteractionsBar isInput={this.isInput}
                             stars={this.props.question.stars}
                             starredByCurrentUser={this.props.question.starredByCurrentUser}
                             ponderCount={this.props.question.ponderCount}
                             ponderedByCurrentUser={this.props.question.ponderedByCurrentUser}
                             questionId={this.props.question.id}
                             toggleIsInput={this.props.toggleIsInput}/>
        <ReactTooltip/>
      </FocusOutline>

    )
  }
}

QuestionFocus.propTypes = {
  question: PropTypes.shape({}).isRequired,
  toggleIsInput: PropTypes.func.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  onPreviousQuestion: PropTypes.func.isRequired,
  navRightText: PropTypes.string.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(QuestionFocus);
