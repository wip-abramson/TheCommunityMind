/**
 * Created by will on 13/11/17.
 */
import React, { PropTypes } from 'react'

import FaPencil from 'react-icons/fa/pencil';

const EditQuestion = (props) => {

  var style= {
    cursor: "pointer"
  }
  return <span>
    <FaPencil style={style} onClick={props.toggleEditable}/>
  </span>
}

// EditQuestion.propTypes = {
//   ownedByCurrentUser: PropTypes.bool.isRequired,
// }

export default EditQuestion;