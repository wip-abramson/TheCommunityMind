import React from 'react'
import How from '../components/How'

var HowContainer = React.createClass({

  getInitialState: function() {
    return {
      hows: [
        {
          id: 1,
          question: "This is a how"
        }
      ],
      newHow: ""
    }
  },

  handleUpdateQuestion: function (e) {
    this.setState({
      hows: this.state.hows,
      newHow: e.target.value
    })
  },

  handleAskQuestion: function (e) {
    e.preventDefault()
    var hows = this.state.hows;
    var question = this.state.newHow;
    var newHow = {
      id: 3,
      question: question
    }
    hows.push(newHow);
    this.setState({
      hows: hows,
      newHow: ""
    })
  },

  render: function() {
    return <How
      placeholder="How ...?"
      onAskQuestion={this.handleAskQuestion}
      onUpdateQuestion={this.handleUpdateQuestion}
      question={this.state.newHow}
      hows={this.state.hows}/>
  }
})

module.exports = HowContainer;
