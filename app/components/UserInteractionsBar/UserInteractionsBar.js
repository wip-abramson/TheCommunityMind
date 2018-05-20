/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import UserInputInteractionsBar from './UserInputInteractionsBar';
import UserViewInteractionsBar from './UserViewInteractionsBar';



const UserInteractionsBar = ({ questionId, stars, starredByCurrentUser, ponderCount, ponderedByCurrentUser, toggleIsInput, isInput, onSubmitQuestion }) => {
  return isInput ? (
    <UserInputInteractionsBar toggleIsInput={toggleIsInput} onSubmitQuestion={onSubmitQuestion}/>
  ) : (
    <UserViewInteractionsBar
      toggleIsInput={toggleIsInput}
      questionId={questionId}
      stars={stars}
      starredByCurrentUser={starredByCurrentUser}
      ponderCount={ponderCount}
      ponderedByCurrentUser={ponderedByCurrentUser}/>
  );

};


UserInteractionsBar.propTypes = {
  questionId: PropTypes.string,
  toggleIsInput: PropTypes.func.isRequired,
  isInput: PropTypes.bool.isRequired,
  onSubmitQuestion: PropTypes.func,
  stars: PropTypes.number,
  starredByCurrentUser: PropTypes.bool,
  ponderCount: PropTypes.number,
  ponderedByCurrentUser: PropTypes.bool
};

export default UserInteractionsBar;