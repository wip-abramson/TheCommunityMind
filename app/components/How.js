import React, { PropTypes } from 'react'
import QuestionInput from '../components/QuestionInput'

var How = React.createClass({
    PropTypes: {
      question: PropTypes.string.isRequired,
      // onUpdateQuestion: PropTypes.func.isRequired,
      // placeholder: PropTypes.string.isRequired,
      onAskQuestion: PropTypes.func.isRequired,
      hows: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired
      }).isRequired).isRequired
    },
    getInitialState: function() {
      return {
        newHow: ""
      }
    },

    handleUpdateQuestion: function (e) {
      console.log("Updating question")
      this.setState({
        newHow: e.target.value
      })
    },
    render: function() {
      return (
        <div>
          <h2>How?</h2>
          <QuestionInput
            question={this.state.newHow}
            onUpdateQuestion={this.handleUpdateQuestion}
            placeholder="How ...?"
            onAskQuestion={this.props.onAskQuestion}>

          </QuestionInput>
          <ul>
            {this.props.hows.map(function(how){
              return <li key={"how-"+how.id}>{how.question}</li>
            })}
          </ul>
        </div>
      )
    }
})




module.exports = How;
