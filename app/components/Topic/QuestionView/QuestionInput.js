import React, {PropTypes} from "react";
import TextInput from "../../generic/TextInput";

function QuestionInput(props) {

  const handleSubmit = (evt) => {

    props.mutate({
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
