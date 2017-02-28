import React from 'react'
import Why from '../components/Why'

var WhyContainer = React.createClass({

  getInitialState: function () {
    return {
      whys: [
        {
          id: 1,
          question: "this is a why"
        },
        {
          id: 2,
          question: "this is another why"
        }
      ],
      newWhy: ""
    }
  },
  handleUpdateQuestion: function (e) {
    this.setState({
      whys: this.state.whys,
      newWhy: e.target.value
    })
  },

  handleAskQuestion: function (e) {
    e.preventDefault()
    var whys = this.state.whys
    var question = this.state.newWhy;
    var newWhy = {
      id: 3,
      question: question
    }
    console.log(newWhy);
    whys.push(newWhy);
    console.log(whys);
    this.setState({
      whys: whys,
      newWhy: ""
    })
  },

  render: function() {
    return <Why
      placeholder="Why ...?"
      onUpdateQuestion={this.handleUpdateQuestion}
      onAskQuestion={this.handleAskQuestion}
      question={this.state.newWhy}
      whys={this.state.whys}/>
  }
})

module.exports = WhyContainer;
