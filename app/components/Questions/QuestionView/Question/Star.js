/**
 * Created by will on 23/04/17.
 */
import React, { PropTypes } from "react";
import FaStar from "react-icons/fa/star";

const Star = (props) => {

  var style = {
    color: "gold",
    cursor: "pointer"
  }
  return (
    <div>
      <FaStar style={props.staredByCurrentUser ? style : {"cursor": "pointer"}}
        onClick={() => {
          if (props.staredByCurrentUser) {
            props.unstarQuestion();
          }
          else {
            props.starQuestion()
          }
          }
        }
      />
      {props.count}
    </div>
  )
}

Star.propTypes = {
  staredByCurrentUser: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default Star