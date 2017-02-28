import React from 'react'

function QuestionInput (props) {
  return (
    <div className="col-sm-12">
        <form onSubmit={props.onAskQuestion}>
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

module.exports = QuestionInput;
