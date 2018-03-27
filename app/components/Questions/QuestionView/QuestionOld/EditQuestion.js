/**
 * Created by will on 13/11/17.
 */
import React, { PropTypes } from 'react'

import FaPencil from 'react-icons/fa/pencil';

const EditQuestion = (props) => {

  let style= {
    cursor: "pointer"
  };
  return <span>
    <FaPencil style={style} onClick={props.editQuestionPopup}/>
  </span>
};

EditQuestion.propTypes = {
  editQuestionPopup: PropTypes.func.isRequired,
};

export default EditQuestion;