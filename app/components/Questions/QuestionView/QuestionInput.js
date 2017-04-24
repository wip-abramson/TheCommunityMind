import React, {PropTypes} from "react";
import TextInput from "../../generic/TextInput";

function QuestionInput(props) {

  const style = {
    height: 50
  }

  const handleSubmit = (evt) => {

    props.addQuestion({
      variables: {question: evt.trim()},
      refetchQueries: [{
        query: props.refetchQuery,
        variables: {
          parentId: props.parentId
        }
      }]
    })
      .then(res => {
        evt = "";
      });
  }
  return (

    <div style={style}>
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
