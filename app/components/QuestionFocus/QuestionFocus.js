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

// TODO make nav items do stuff (Separate component)
// TODO left arrow should go to previous right arrow should go to random unless user selects a link to traverse
// const QuestionFocus = ({ isInput, focussedId }) => {
//   return (
//     <div className={styles.focusGrid}>
//       <QuestionUsernameBar/>
//       <FaLeftArrow size={30} className={styles.leftNav}/>
//       <QuestionBox>Qhere are you</QuestionBox>
//       <FaRightArrow size={30} className={styles.rightNav}/>
//       <UserInteractionsBar/>
//     </div>
//   )
// };

// TODO link up to backend and fetch question
// TODO implement left and right arrow nav
class QuestionFocus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInput: false
    };

    this.toggleIsInput = this.toggleIsInput.bind(this);
  }

  toggleIsInput() {
    console.log("Changinging input type")
    this.setState({
      isInput: !this.state.isInput
    })
  }

  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar isInput={this.state.isInput} user={{ id: "1", username: "Will" }}/>
        <FaLeftArrow size={30} className={styles.leftNav}/>
        <QuestionBox isInput={this.state.isInput}/>
        <FaRightArrow size={30} className={styles.rightNav}/>
        <UserInteractionsBar isInput={this.state.isInput} questionId={11} toggleIsInput={this.toggleIsInput}/>
      </div>

    )
  }
}

QuestionFocus.propTypes = {
  isInput: PropTypes.bool.isRequired,
  focussedId: PropTypes.string.isRequired
};

export default QuestionFocus;
