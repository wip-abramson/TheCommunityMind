import React, { PropTypes } from 'react'
import TextInput from './generic/TextInput'

function QuestionInput (props ) {

    const handleSubmit = (evt) => {
        // evt.persist();
        console.log(evt)
        props.mutate({
            variables: {question: evt},
            refetchQueries: [ {query: props.refetchQuery}]
        })
        .then( res => {
            evt = "";
        });
    }
  return (

    <div className="col-sm-12">
      <TextInput
        placeholder={props.placeholder}
        submitName="Ask"
        onSubmit={handleSubmit}
      />

    </div>
  )
}

QuestionInput.PropTypes = {

  placeholder: PropTypes.string.isRequired,

}


export default QuestionInput;
