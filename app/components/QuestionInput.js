import React, { PropTypes } from 'react'

function QuestionInput (props) {
  return (
    <div className="col-sm-12">
        <form onSubmit={function(e) {
          e.preventDefault()
          // console.log("Props",props)
          // if (props.question.trim()) {
          //   return;
          // }
          props.onAskQuestion(props.question)
        }}>
          <div className="form-group">
            <input
              className="form-control"
              placeholder={props.placeholder}
              onChange={props.onUpdateQuestion}
              value={props.question}
              type="text" />
          </div>
          <div className="form-group col-sm-4 col-sm-offset-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Ask
              </button>
          </div>
        </form>
      </div>
  )
}

QuestionInput.PropTypes = {
  question: PropTypes.string.isRequired,
  onUpdateQuestion: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  onAskQuestion: PropTypes.func.isRequired
}


module.exports = QuestionInput;
