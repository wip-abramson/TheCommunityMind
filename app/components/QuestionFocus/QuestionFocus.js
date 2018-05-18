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
// const QuestionFocusContainer = ({ isInput, focussedId }) => {
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

  isInput = false;

  constructor(props) {
    super(props);

    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
  }

  handleSubmitQuestion(data) {
    console.log(data);
  }

  render() {
    return (
      <div className={styles.focusGrid}>
        <QuestionUsernameBar isInput={this.isInput} user={{ id: "1", username: "Will" }}
                             focusType="Question Focus"/>
        <FaLeftArrow size={30} className={styles.leftNav}/>
        <QuestionBox
          question={{
            id: "1",
            questionText: "Why can't I view my digital footprint in one easily accessible user interface",
            topics: [
              { id: "12", name: "Questioning" },
              { id: "13", name: "Answers" },
              { id: "11", name: "Meaning" },
              { id: "1", name: "Ideas" }] }}
          isInput={this.isInput}
          onSubmitQuestion={this.handleSubmitQuestion}/>
        <FaRightArrow size={30} className={styles.rightNav}/>
        <UserInteractionsBar isInput={this.isInput} questionId={11}
                             toggleIsInput={this.props.toggleIsInput}/>
      </div>

    )
  }
}

QuestionFocus.propTypes = {
  isInput: PropTypes.bool.isRequired,
  focussedId: PropTypes.string.isRequired,
  toggleIsInput: PropTypes.func.isRequired
};

export default QuestionFocus;
