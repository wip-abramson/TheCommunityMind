/**
 * Created by will on 13/11/17.
 */
import React, { PropTypes } from 'react'

import FaPencil from 'react-icons/fa/pencil';

const EditQuestion = (props) => {
  return <div>
    <FaPencil onClick={props.toggleEditable}/>
  </div>
}

// EditQuestion.propTypes = {
//   ownedByCurrentUser: PropTypes.bool.isRequired,
// }

export default EditQuestion;