/**
 * Created by will on 13/11/17.
 */
import React from 'react'
import { Link } from 'react-router'

class QuestionText extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: props.question,
  //   }
  //
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleKeyPress = this.handleKeyPress.bind(this)
  //
  //   this.setWrapperRef = this.setWrapperRef.bind(this);
  //   this.handleClickOutside = this.handleClickOutside.bind(this);
  // }
  //
  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClickOutside);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutside);
  // }
  //
  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }
  //
  // handleKeyPress(event) {
  //   if (event.charCode == 13) {
  //     event.preventDefault();
  //     console.log(event.target.value)
  //     this.props.editQuestion(event.target.value, this.props.questionType.question.id)
  //   }
  // }
  //
  // /**
  //  * Set the wrapper ref
  //  */
  // setWrapperRef(node) {
  //   this.wrapperRef = node;
  // }
  //
  // /**
  //  * When click outside of edit question text input, question turns back to uneditable
  //  */
  // handleClickOutside(event) {
  //   if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
  //     this.props.toggleEditable();
  //   }
  // }

  render() {
    var textComponent;

    // if (this.props.editable) {
    //   textComponent = <input onKeyPress={this.handleKeyPress}
    //                          ref={this.setWrapperRef}
    //                          value={this.state.value}
    //                          onChange={this.handleChange}/>
    // }
    //Only Why and What if questions have a link
    if (this.props.link) {
      textComponent = <Link
        onClick={() => {
          this.props.onSelectQuestion(this.props.questionType)
        }}
        to={this.props.link}>
        {formatQuestion(this.props.question)}
      </Link>
    }
    else {
      textComponent = formatQuestion(this.props.question)
    }
    return (
      <div>
        <Link onlyActiveOnIndex="" onlyActiveOnIndex="" onlyActiveOnIndex="" to={"/question/" + this.props.question.id}>{textComponent}</Link>
      </div>
    )
  }
}

function formatQuestion(question) {
  console.log(question)
  if (question.charAt(question.length - 1) !== '?') {
    question = question + '?';
  }
  return question.charAt(0).toUpperCase() + question.substring(1)
}

export default QuestionText;