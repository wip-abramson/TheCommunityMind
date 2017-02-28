import React from 'react'
import WhatIf from '../components/WhatIf'

var WhatIfContainer = React.createClass({

  getInitialState: function() {
    return {
      whatIfs: [
        {
          id: 1,
          question: "this is a whatif"
        },
        {
          id: 2,
          question: "this is another whatif"
        }
      ],
      newWhatIf: ""

    }
  },

  handleUpdateQuestion: function (e) {
    this.setState({
      whatIfs: this.state.whatIfs,
      newWhatIf: e.target.value
    })
  },

  handleAskQuestion: function (e) {
    e.preventDefault()
    var whatIfs = this.state.whatIfs;
    var question = this.state.newWhatIf;
    var newWhatIf = {
      id: 3,
      question: question
    }
    console.log(newWhatIf);
    whatIfs.push(newWhatIf);
    this.setState({
      whatIfs: whatIfs,
      newWhatIf: ""
    })
  },

  render: function() {
    return <WhatIf
      placeholder="What If ...?"
      onUpdateQuestion={this.handleUpdateQuestion}
      onAskQuestion={this.handleAskQuestion}
      question={this.state.newWhatIf}
      whatIfs={this.state.whatIfs}/>
  }
})

module.exports = WhatIfContainer;
