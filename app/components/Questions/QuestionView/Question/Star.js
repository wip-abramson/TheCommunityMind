/**
 * Created by will on 23/04/17.
 */
import React, { PropTypes } from "react";
import FaStar from "react-icons/fa/star";

const Star = (props) => {

  var style = {
    color: "gold",
    cursor: "pointer",
    marginRight: 10
  }
  return (
    <span>
      <FaStar style={props.staredByCurrentUser ? style : {"cursor": "pointer", marginRight: "10px"}}
        onClick={() => {
          props.staredByCurrentUser ? props.unstarQuestion() : props.starQuestion();
          }
        }
      />
      {props.count}
    </span>
  )
}

Star.propTypes = {
  staredByCurrentUser: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  unstarQuestion: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default Star