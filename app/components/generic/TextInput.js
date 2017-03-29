import React, { PropTypes } from 'react'

function TextInput (props) {
  let input;

  return (
        <form onSubmit={function(e) {
          e.preventDefault()

          if (! input.value.trim()) {
            return;
          }
          props.onSubmit(input.value)
          input.value="";
        }}>
          <div className="form-group col-sm-8">
            <input
              ref={node => {
                input = node
              }}
              className="form-control"
              placeholder={props.placeholder}
              type="text" />
          </div>
          <div className="form-group col-sm-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                {props.submitName}
              </button>
          </div>
        </form>

  )
}

TextInput.PropTypes = {
  submitName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default TextInput;
