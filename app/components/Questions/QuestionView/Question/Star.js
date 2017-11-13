/**
 * Created by will on 23/04/17.
 */
import React, { PropTypes } from "react";
import FaStarO from "react-icons/fa/star-o";

const Star = (props) => {

  var style = {
    color: "yellow"
  }
  return (
    <div>
      <FaStarO style={props.staredByCurrentUser ? style : null}
        onClick={() => {
          console.log("Star");
          props.starQuestion()}
        }
      />
      {props.count}
    </div>
  )
}

Star.propTypes = {
  staredByCurrentUser: PropTypes.bool.isRequired,
  starQuestion: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default Star