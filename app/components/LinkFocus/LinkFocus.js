/**
 * Created by will on 22/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import LinkBox from '../LinkBox/LinkBox';
import QuestionUsernameBar from '../QuestionUsernameBar/QuestionUsernameBar';
import FocusOutline from '../generic/FocusOutline/FocusOutline';
import FocalCenterOutline from '../generic/FocalCenterOutline/FocalCenterOutline';


const LinkFocus = ({questionLink, onNextQuestion, onPreviousQuestion}) => {
  return (
    <FocusOutline canNavigate={true} navigateRight={onNextQuestion} navigateLeft={onPreviousQuestion}>
      <QuestionUsernameBar timeCreated={questionLink.createdAt} user={questionLink.owner} isInput={false} focusType="Link Focus"/>
      <FocalCenterOutline>
        <LinkBox questionLink={questionLink}/>
      </FocalCenterOutline>
    </FocusOutline>
  )
};

LinkFocus.propTypes = {
  questionLink: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string.isRequired
    }),
    fromQuestion: PropTypes.shape({
      id: PropTypes.string.isRequired,
      questionText: PropTypes.string.isRequired
    }),
    toQuestion: PropTypes.shape({
      id: PropTypes.string.isRequired,
      questionText: PropTypes.string.isRequired
    })
  })
};

export default LinkFocus;