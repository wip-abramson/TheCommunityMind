/**
 * Created by will on 13/11/17.
 */
import React, { PropTypes } from 'react'

import FaPencil from 'react-icons/fa/pencil';

const EditQuestion = (props) => {

  var style= {
    cursor: "pointer"
  }
  return <div>
    <FaPencil style={style} onClick={props.toggleEditable}/>
  </div>
}

// EditQuestion.propTypes = {
//   ownedByCurrentUser: PropTypes.bool.isRequired,
// }

export default EditQuestion;