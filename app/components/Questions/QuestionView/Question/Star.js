/**
 * Created by will on 23/04/17.
 */
import React from "react";
import FaStarO from "react-icons/fa/star-o";

const Star = (props) => {
  return (
    <div>
      <FaStarO
        onClick={() => console.log("Star")}
      />
      {props.count}
    </div>
  )
}

export default Star;