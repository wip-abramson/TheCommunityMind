/**
 * Created by will on 23/05/18.
 */
import React from 'react'
import PropTypes from 'prop-types';

import QuestionFocusContainer from '../QuestionFocus/QuestionFocusContainer'

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };

    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onPreviousQuestion = this.onPreviousQuestion.bind(this);
    this.getQuestionToDisplay = this.getQuestionToDisplay.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  onPreviousQuestion() {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex-1
      })
    }
  }

  onNextQuestion() {
    console.log("NEXT", this.state.currentIndex, this.props.totalQuestionsCount)
    if (this.state.currentIndex + 1 <= this.props.totalQuestionsCount - 1) {
      if(this.state.currentIndex + 1 >= this.props.questionConnection.edges.length -1) {
        this.props.loadMoreEntries();
      }
      console.log("NEXT", this.props.questionConnection.edges.length, this.props.totalQuestionsCount)

      while(this.props.questionConnection.edges.length <= this.state.currentIndex+1){}
      this.setState({
        currentIndex: this.state.currentIndex+1
      })


    }
  }

  getQuestionToDisplay() {
    return this.props.questionConnection.edges[this.state.currentIndex].node;
  }

  getTitle() {
    return this.state.currentIndex+1 + " / " + this.props.totalQuestionsCount + " " + this.props.title
  }


  render() {
    if(this.props.loading) {
      return <h1>Loading</h1>
    }
    if(this.props.error) {
      return <h1>Error</h1>
    }
    console.log(this.props.questionConnection)
    return (
      <div>
        <h1>{this.getTitle()}</h1>
        {/*<div>{this.props.questionConnection.edges.length}</div>*/}
        <QuestionFocusContainer
          question={this.getQuestionToDisplay()}
          loading={false}
          onNextQuestion={this.onNextQuestion}
          onPreviousQuestion={this.onPreviousQuestion}/>

      </div>
    )
  }

}

// QuestionsList.propTypes = {
//   questionConnection: PropTypes.shape({
//     edges: PropTypes.array().isRequired,
//     pageInfo: PropTypes.shape({}).isRequired
//   }).isRequired,
//   totalQuestionsCount: PropTypes.number.isRequired,
//   loadMoreEntries: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired
// };

export default QuestionsList;